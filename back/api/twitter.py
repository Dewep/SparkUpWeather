from flask_restful import reqparse, Resource
from api_tools.error import ResponseError, catch_errors
import json
import urllib.request
import urllib.parse
import settings
from TwitterAPI import TwitterAPI


api = TwitterAPI(settings.TWITTER_CONSUMER_KEY, settings.TWITTER_CONSUMER_SECRET, settings.TWITTER_ACCESS_TOKEN, settings.TWITTER_TOKEN_SECRET)


class GenericTwitter(Resource):
    def _search(self, **params):
        return api.request('search/tweets', params)

    def search_by_geographic_coordinates(self, lat, lon, search, radius="30km", count=10):
        geocode = str(lat) + "," + str(lon) + "," + radius
        return self._search(q=search, count=count, geocode=geocode)


class APIWeatherTwitter(GenericTwitter):
    @catch_errors
    def get(self, lat, lon):
        tweets = []
        results = self.search_by_geographic_coordinates(lat, lon, "#meteo -filter:retweets", count=5)
        for result in results:
            tweets.append(result["user"]["screen_name"] + "/status/" + result["id_str"])
        return {"tweets": tweets}
