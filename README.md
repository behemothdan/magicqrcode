# MQR
## Overview
This is a simple API designed to allow users to provide a list of links
to Magic: The Gathering deck lists and then generate a printable file
of QR codes that they can print out and put on deck boxes, folders,
or wherever they might want to have an easy way for folks to see
their deck lists.

## The Code
The implementation os pretty straight-forward. I use Express.js to scaffold
the API. I added PDFKit and QRCode for the generation of the printable file
the user generates. It should handle any number of given deck links in a 
single API POST request.

It also accepts an optional string for the deck title/Commander/etc if 
they wish to provide that. It also accepts a string for a HEX value if 
they want the QR code and label to be in a different color.
