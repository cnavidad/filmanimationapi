var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape/:filmTitle', function(req, res){
    film = req.params.filmTitle.replace(/\s+/g, '+');
    console.log(film);
	url = 'https://www.google.es/search?hl=es-419&q='+film+'+site:filmaffinity.com+animacion';
	request(url, function(error, response, html){
            if(!error){
                var $ = cheerio.load(html);
                var link;
                $('div.kv cite').eq(0).filter(function(){ 
                    link = $(this).text().slice(-11).slice(0,-5); 
                    console.log(link);
                })
            }
            FilmUrl = 'http://www.filmaffinity.com/es/film'+link+'.html';
            request(FilmUrl, function(error, response, html){
                if(!error){
                    var $ = cheerio.load(html);

                    var json = { title : "", year : "", length:"", category:"", rating: "",cover: "", sinopsis : ""};
                    $('#main-title span[itemprop="name"]').filter(function(){
                        json.title = $(this).text();
                        //res.send(title);
                    })
                    $('dd[itemprop="datePublished"]').filter(function(){
                        json.year = $(this).text();
                        //res.send(json.year);
                    })
                        var last = $('.movie-info:first-child dd').length;
                    $('.z-movie #left-column .movie-info dd').eq(last-1).filter(function(){
                        json.sinopsis = $(this).text();
                        //res.send(json.sinopsis);
                    });
                    $('#movie-rat-avg').filter(function(){
                        json.rating = $(this).text().replace(/\s+/g, '');
                        //res.send(json.rating);
                    })
                    $('#movie-main-image-container img').filter(function(){
                        json.cover = $(this).attr('src').replace(/\s+/g, '');
                        //res.send(json.cover);
                    })
                    $('dd[itemprop="datePublished"]+dt+dd').filter(function(){
                        json.length = $(this).text();
                        //res.send(json.length);
                    })
                    $('.z-movie #left-column .movie-info:first-child dd span').filter(function(){
                        json.category = $(this).text().replace(/\s+/g, '');
                        //res.send(json.category);
                    })
                    JSON.stringify(json, null, 4);
                    res.json(json);    

                }

            /*fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');*/
            })

            /*fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){
                console.log('File successfully written! - Check your project directory for the output.json file');*/
            })
	})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app; 	

