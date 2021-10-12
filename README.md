Demo: https://tau-station-test-frontend.herokuapp.com/

(might take some time to load if the dynos are asleep)

---

Live Photo Submissions coding test for JavaScript

# The Synopsis

You are working with a press organisation that receives around 10,000 images a day - uploaded via a web interface. You have been contracted to produce a web based interface that will dynamically display incoming image submissions in close to real time.

You have one week to finish the task. You absolutely will NOT be penalized for taking the entire week. We'd rather see what you can do to make the code "production ready" than see you rush to get the code back to us as soon as possible.

# The Details

The image editor's desk of a large press organisation have a requirement to be able to review incoming images on a live, web based display.

The web application will be able to request previews/thumbnails of the incoming images with one of these widths: 48px, 400px, 800px, 1280px. Each image will be scaled by the back end to the appropriate height to maintain its aspect ratio.

An image will have an asset id associated with it. The application should construct a URL from that id and clicking on an image should navigate to it. It should be possible to navigate or scroll back through recently uploaded images.

Because of the requirement for real time display you have been tasked with designing a prototype for the interface that the back end will provide to your application. You need not implement this back end, merely describe the interface you would like it to provide to your application.

The application will be used by at most 100 concurrent users so it's acceptable to make frequent HTTP requests to the back end. The application will be used both in the office and remotely.

Because the web service does not yet exist you should make it possible for your application to be demonstrated with built in mocked data.

You should pay particular attention to what happens if the back end web service fails to respond or responds with an error. Your application will be the principal means of viewing incoming image submissions so it is important that any failures are clearly signalled.

When images are uploaded certain metadata are extracted: location, keywords, date/time taken. There is no current requirement to make this data available in your application - however you may wish to consider that this could be a future requirement.

# Deliverables

You should strive to produce code which is _production ready_ (for whatever definition of "production ready" you feel comfortable with. This does _not_ mean perfect -- we readily accept that no code is perfect. We have deadlines, unclear specifications (like this one), and other time constraints. Instead, we expect that you submit to us code that, while not perfect, is nonetheless an example of the minimum quality you feel appropriate for production code.

You may use whatever tools you wish as long as you deliver a JavaScript application. You may assume that your users will have up to date HTML 5 capable browsers.

## What to send us

On or before one week of receiving this, you should send us a Github link or a tarball or zip file containing:

- A self contained JavaScript application using mocked data to simulate the intended back end web service.
- Any test images required to demonstrate the application.
- A README text document that describes the interface that will be exposed by the back end service and explains any decisions you made which you feel are relevant
