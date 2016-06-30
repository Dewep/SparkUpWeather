from flask_restful import reqparse, Resource
from api_tools.error import ResponseError, catch_errors
import json
import urllib.request
import urllib.parse
import settings


class GenericWeather(Resource):
    def _request(self, path, **params):
        params["appid"] = settings.OPENWEATHERMAP_API_KEY
        params["units"] = "metric" # For temperature in Celsius
        params["lang"] = "fr"
        params["format"] = "json"
        full_url = settings.OPENWEATHERMAP_BASE_URL + path + "?" + urllib.parse.urlencode(params)
        response = urllib.request.urlopen(full_url)
        return json.loads(response.read().decode('utf8'))

    def get_by_city_name(self, city_name):
        return self._request("/weather", q=city_name)

    def get_by_geographic_coordinates(self, lat, lon):
        return self._request("/weather", lat=str(lat), lon=str(lon))

    def get_by_bbox_coordinates(self, NE_lat, NE_lon, SW_lat, SW_lon, zoom=10):
        bbox = str(SW_lon) + "," + str(NE_lat) + "," + str(NE_lon) + "," + str(SW_lat) + "," + str(zoom)
        return self._request("/box/city", bbox=bbox, cluster="yes")


class APIWeatherList(GenericWeather):
    @catch_errors
    def get(self):
        return []


class APIWeatherCity(GenericWeather):
    @catch_errors
    def get(self, city_name):
        return self.get_by_city_name(city_name)


class APIWeatherCoordinates(GenericWeather):
    @catch_errors
    def get(self, lat, lon):
        return self.get_by_geographic_coordinates(lat, lon)


class APIWeatherBbox(GenericWeather):
    @catch_errors
    def get(self, NE_lat, NE_lon, SW_lat, SW_lon, zoom):
        return self.get_by_bbox_coordinates(NE_lat, NE_lon, SW_lat, SW_lon, zoom)
