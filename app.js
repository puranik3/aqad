const express = require( 'express' );
const path = require( 'path' );
const fs = require( 'fs' );
const quotes = require( './quotes.json' ).quotes;

const PORT = process.env.PORT || 3000;

const app = express();

app.get( '/', function( req, res ) {
    fs.readFile( path.join( __dirname, 'index.html' ), 'utf8', function( err, contents ) {
        if( err ) {
            console.log( err );
            res.status( 500 ).end( 'Oops something went wrong. Please try again later' );
            return;
        }

        var random = Math.floor( Math.random() * quotes.length );
        const newContents = contents.replace( '{{quote}}', quotes[random] );
        res.status( 200 ).type( 'html' );
        res.end( newContents );
    });
});

// server.listen is a non-blocking function
app.listen( 
    PORT, 
    function( err ) {
        if( err ) {
            console.log( 'some error occured\n', err );
            return;
        }

        console.log( 'the server started on port ' + PORT );
    }
);

console.log( 'end of script' );