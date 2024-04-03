import requests
import time
from flask import Flask, jsonify
from collections import deque

app = Flask(__name__)

WINDOW_SIZE = 10
NUMBER_SERVER_URL = "http://testserver.com/numbers"


class NumberCache:
    def __init__(self):
        self.numbers = deque(maxlen=WINDOW_SIZE)

    def add_number(self, number):
        if number not in self.numbers:
            self.numbers.append(number)

    def get_numbers(self):
        return list(self.numbers)

    def calculate_average(self):
        if not self.numbers:
            return 0
        return sum(self.numbers) / len(self.numbers)


number_cache = NumberCache()


def fetch_numbers():
    try:
        response = requests.get(NUMBER_SERVER_URL)
        if response.status_code == 200:
            numbers = response.json()
            return numbers
        else:
            return None
    except requests.exceptions.RequestException:
        return None


def fetch_and_update_cache():
    numbers = fetch_numbers()
    if numbers is not None:
        for number in numbers:
            number_cache.add_number(number)


def clean_cache():
    while len(number_cache.numbers) > WINDOW_SIZE:
        number_cache.numbers.popleft()


@app.route('/numbers/<string:numberid>')
def handle_number_request(numberid):
    start_time = time.time()

    fetch_and_update_cache()
    clean_cache()

    current_numbers = number_cache.get_numbers()
    average = number_cache.calculate_average()

    response = {
        "previous_window": current_numbers[:-1],
        "current_window": current_numbers,
        "average": average
    }

    elapsed_time = time.time() - start_time
    if elapsed_time > 0.5:
        print("Warning: Request took more than 500ms to process")

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)
