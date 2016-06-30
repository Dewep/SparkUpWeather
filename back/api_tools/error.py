from flask import request
from flask_restful import reqparse

class ResponseError(Exception):
    def __init__(self, title=None, message=None, code=400):
        self.errors = dict()
        if title and message:
            self.errors[title] = message
        self.code = code

    def add_error(self, title, message):
        self.errors[title] = message

    def response(self):
        return {"message": self.errors}, self.code


def catch_errors(func):
    def inner_catch_errors(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except ResponseError as e:
            return e.response()
        except Exception as e:
            if request.args.get("debug", None) is not None:
                raise
            try:
                return e.data
            except AttributeError:
                return {"message": {e.__class__.__name__: str(e)}}, 500
    return inner_catch_errors
