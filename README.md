# leaflet-challenge
fifteenth week's challenge

I began with finding the appropriate zoom and center of my map so that it would resemble the given image. For this, I used the URL of OpenStreetMap after finagling a bit.

I used OpenStreetMap for my tileLayer, too, by including it in logic.js .

Then, I began with a function for the markers's sizes. At first I thought that having a base value and having it fluctuate by multiplication based on the earthquakes' magnitudes would be my best bet; however, I quickly realized that the markers' sizes fluctuated too much when the fluctuation was cause by multiplication, so I consulted Xpert, which recommended using addition as cushion for the fluctuation by multiplication. Implementing this improved the readability of my map, greatly.

After that, I created conditionals for the color of the markers (based on the earthquakes' depths). There were a couple of challenges as I did this:
1. The placement of the conditionals -- It needed to be within a loop, which needed to be within the connection to D3's geojson API.
2. The intervals corresponding to the colors -- I did some research using the documentation from USGS (where the earthquakes' were recorded) over here: https://earthquake.usgs.gov/data/comcat/index.php#depth , and it claimed that the typical values for depths ranged from 0 km to 1000 km. When I even distributed the values until 1000 using six colors, though, all of the colors were pale. There was no variation in them. So, I settled down to peruse the actual depths in my data, and found that most of the values were below 50! Then, I realized that the intervals in the given image were in intervals of 20. If I had more time, I would have liked to know how the given image was able to use determine the most suitable intervals. Was it determined through trial and error? Statistics?

Following the conditionals-conundrum, I made the circles for the markers, referencing the condtionals and the function for the size and binding a popup to each of them by placing that piece of code <em>within</em> the loop.

The legend which we made in class was difficult to decipher after so long since the lesson, so I took it back to the basics by reading up on some documentation for the simplest legend. Once that I had done so, I embellished it by asking Xpert for padding, background, and rounded corners.
