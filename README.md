# Bamazon
An Amazon-like storefront set of node applications.

**BAmazon Customer App** allows customers to shop store items. All store items are stored in a MySQL database.

**BAmazon Manager App** accepts the following commands:

* **View Products for Sale** - view all products for sale in the store
* **View Low Inventory** - view all products that are low in inventory
* **Add to Inventory** - add inventory of an existing item in the store
* **Add New Product** - add a brand new item to the store
* **Exit** - exit application

## Table of Contents

1. [Getting Started](#getting-started)
    1. [Prerequisites](#prerequisites)
    2. [Installing](#installing)
2. [Run](#run)
3. [BAmazon Customer](#bamazon-customer)
4. [BAmazon Manager](#bamazon-manager)
    1. [View Products for Sale](#view-products-for-sale)
    2. [View Low Inventory](#view-low-inventory)
    3. [Add to Inventory](#add-to-inventory)
    4. [Add New Product](#add-new-product)
    5. [Exit](#exit)
5. [Built With](#built-with)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need the following:

* [Node](https://nodejs.org/en/) installed
* [MySQL](https://www.mysql.com/downloads/) server installed
  * App will use the 'root' user and a blank password (for now)

### Installing

Following these instructions step by step to get a development env running:

1. Clone this repository
2. Start your local MySQL server
3. Run the `BAmazonDB.sql` found in the `sql` folder in your local MySQL Database
4. From the root of your repo, run `npm install`
    * This will install all application dependencies specified in the `package.json`

## Run

To run the BAmazon Custumer App simply run the following command at the root of the repo:

```
node bamazonCustomer.js
```

To run the BAmazon Manager App simply run the following command at the root of the repo:

```
node bamazonManager.js
```

Once you start BAmazon Manager, you'll be able to select from the available commands like so:

![Start Image](/images/start-liri.png)

## BAmazon Customer

TODO: BAamazon Customer documentation

## BAmazon Manager

### View Products for Sale

* Select the `concert_this` command and type in your favorite artist to check out what concerts they have coming up!
* The venue name, location and date of each concert will be shown

![Concert This](/images/concert-this.gif)

* If the artist has no upcoming concerts, you'll get this:

![Concert This None](/images/concert-this-none.gif)

* If you type in an unknown artist, you'll get this:

![Concert This Error](/images/concert-this-error.gif)

### View Low Inventory

* Select the `spotify_this_song` command and type in a song you want info on!

![Spotify This](/images/spotify-this-song.gif)

* If you type in an unknown song, you'll get this:

![Spotify This Error](/images/spotify-this-song-error.gif)

### Add to Inventory

* Select the `movie_this` command and type in a movie you want info on!

![Movie This](/images/movie-this.gif)

* If you type in an unknown movie, you'll get this:

![Movie This Error](/images/movie-this-error.gif)

### Add New Product

* The `do_what_it_says` command will run the command and argument specified in the `random.txt` file
* In the example below, the `random.txt` file contains the following text:

```
spotify_this_song,"I Want it That Way"
```

![Random Spotify](/images/random-spotify.gif)

* As another example, the `random.txt` file here contains the following text:

```
movie_this,"Shutter Island"
```

### Exit

TODO

![Random Movie](/images/random-movie.gif)

## Built With

* [Node](https://nodejs.org/en/) - The framework used
