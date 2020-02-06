# Description
This is a tool that allows you to retrieve information about movies using data from TMDB. It was built with React and Flask. It implements an Autocomplete component that retrieves data for you to preview.

# Live Deployment
This application can be seen live at the github-pages associated with this repo. 

https://zachareid.github.io/MovieSearchTool/

The autocomplete results may take a second to first load, as it's hosted on a free Heroku account, which has that quality :^)

# Local Deployment
First, clone this repository.

```
git clone https://github.com/zachareid/MovieSearchTool.git
```

Then, you'll need to install the dependencies for React and the Flask server.

## React
To install the dependencies, all you need to do is run the following command in the root directory of the project.

```
npm install
```

To run the react development server, execute the following command:

```
npm start
```

This runs the development server at http://localhost:3000. Any changes you make to the React files will automatically trigger a reload of the server.

## Python Flask
Next, navigate to ./server. This is where the Flask backend code is held. To install the dependencies, make sure you have Python3 installed, as well as pip. Then, you'll start by creating a virtual environment and activating it.

```
python3 -m venv movie_venv
source movie_venv/bin/activate
```
Then, install the dependencies with the following command:

```
pip install -r requirements.txt
```

Now that the environment is set up, you can run your backend Flask server with the following:

```
python main.py
```

This starts the backend which is serving API calls at http://localhost:5000.
