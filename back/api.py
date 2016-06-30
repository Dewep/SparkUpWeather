from flask import Flask
from flask_restful import Api
from werkzeug.routing import FloatConverter as BaseFloatConverter

from api.weather import APIWeatherList, APIWeatherCity, APIWeatherCoordinates, APIWeatherBbox
from api.twitter import APIWeatherTwitter


class CoordinateConverter(BaseFloatConverter):
    regex = r'-?\d+(\.\d+)?'


app = Flask(__name__)
app.url_map.converters['coordinate'] = CoordinateConverter
app.config.from_object('settings')
api = Api(app, catch_all_404s=True)


api.add_resource(APIWeatherList, '/api/weather/')
api.add_resource(APIWeatherCity, '/api/weather/city/<string:city_name>/')
api.add_resource(APIWeatherCoordinates, '/api/weather/coordinates/<coordinate:lat>,<coordinate:lon>/')
api.add_resource(APIWeatherBbox, '/api/weather/bbox/<coordinate:NE_lat>,<coordinate:NE_lon>,<coordinate:SW_lat>,<coordinate:SW_lon>,<int:zoom>/')
api.add_resource(APIWeatherTwitter, '/api/weather/twitter/<coordinate:lat>,<coordinate:lon>/')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
