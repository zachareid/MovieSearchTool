from flask import jsonify, request
from app import app
import tmdbsimple as tmdb

tmdb.API_KEY = 'db0ddff1b1f2707c30756b231cbc35f5'


@app.route('/getMovie')
def movie():
    """
    This is a GET api endpoint to return a movie for a given movie ID.

    Request arguments:
        request.args["movieId"] -- TMDB id of the movie

    Returns:
        jsonify(res) -- json formatted movie information.
                        It contains the keys: title, summary, release, budget, and runtime
    """
    res = { "title":"",
            "summary": "",
            "release": "",
            "budget": "",
            "runtime": "",
            "imgfile": ""
            }
    if request.args["movieId"] == "":
        return jsonify(res)
    else:
        try:
            movie = tmdb.Movies(int(request.args["movieId"]))
            info = movie.info()
            res = { "title":info["title"],
                    "summary": info["overview"],
                    "release": info["release_date"],
                    "budget": info["budget"],
                    "runtime": info["runtime"],
                    "imgfile": info["poster_path"]}
        except Exception as e:
            print("Error processing movieId: {0}. Error: {1}".format(request.args.get("movieId"), str(e)))
    return jsonify(res)

@app.route('/getMovies')
def movies():
    """
    This is a GET api endpoint to return a list of autocomplete movie suggestions for a given string

    Request arguments:
        request.args["movieName"] -- string to use for autocomplete suggestions

    Returns:
        jsonify(res) -- json formatted list of movie autocomplete suggestions.
                        Accessing ["titles"] contains an array of string suggestions
    """
    res = {"titles":[]}
    if request.args["movieName"] == "":
        return jsonify(res)
    else:
        try:
            search = tmdb.Search()
            response = search.movie(query=request.args["movieName"])
            titles = [{"id":m['id'], "label":m['title'] } for m in response["results"]]
            res = {"titles":titles}
        except Exception as e:
            print("Error processing movie: {0}. Error: {1}".format(request.args.get("movieId"), str(e)))
    return jsonify(res)
