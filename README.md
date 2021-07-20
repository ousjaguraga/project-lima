# Front End Assignment Proposed Solution

## Available scripts

To start the project, simply run:

```bash
npm run start
```

To classify a dog

```
 1: click load model

```

When the model is loaded you will be navigated to the upload image state Pease
select a photo of a dog

```
2: click upload image

```

To classify the image

```
3: click identify breed

```

The model will attempt to classify

If it succeeds click load gallery to load a gallery of dogs of the same kind

```
4: click load gallery

```

If it fails you'll be taken to the upload image page

```
select an image of a dog to try again

```

To start again press start again

# Codebase Documentation

The codebase is divided into various units. The first part is uploading an image
from the user's file system The second part is previewing the image, then
feeding the image the mobilenet model to classify, the model returns with a
result or an error is raised. Finally we load photos of cute dogs of the same
breed

After an extensive research we have abstracted the solution into a state machine
which we interestingly call flow 😃 (true, naming is hard). Because it is the
flow of our application state. The flow of the app which also beautifully map to
the state are defined in

```
flow.ts

```

# Uploading a photo from the user's file system

To upload the photo we use the component Upload in

```
components/upload.tsx

```

This component accepts as props a change event handler and a react ref object It
returns a controlled input element that we can reference with the Ref object.

# Previewing The Image

This was a very tricky part to implement. After so many roads were exhausted, it
turned out the solution is really simple We used

```
URL.createObjectURL
```

passing the file name from our controlled input element as input, just like that
we have a link we can store in our state. We used this link to populate the
image and preview it to the user. Next step: get the model up and ready.

# Loading The Model (mobilenet) And Classifying

To load the model we call the load method as described in the mobilenet
documentation, after the model loads, we pass a reference to the image we have
in the preview. We call the classify method and expect a result with a classname
and probabilty.

# Loading The Gallery

After we have the breed of the dog, we use the Dog API to load more photos of
the same breed. We use react-lazy-load to load the images and display a scroling
gallery of the images

# Design Choices

We have chosen to hide the input element so that it does not interfare with the
look of our homepage since we can still access it though our Ref object. This
component provides the functionality of allowing the user to upload a file (an
image in our case) and that's it.

Sometimes there are subreeds names, we could have used regex to load the
subreeds but due to inconsistencies in the way the models presents the subbreed
names and time constraints we decided to stick as per the requirement just the
breed.

This has been an amazing learning experience !
