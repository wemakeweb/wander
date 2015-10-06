Wander 
====

> **Wander** is a ghost theme.

## Usage

### Quotations

There's two different ways to show quotation.

#### Blockquote
```
> Quoted text here
>
> ![Images work well inside a quote]()
>
> More text
```

#### Quote
```
<q>Your quote here, this will show up centered with a larger font-size and with a serif-font. Great for Quoting someone famous :)</q>
```

### Images
There are currently 4 different sizes an image can be displayed at:

 1. Small *(add the fragment `#small`)*
 2. Normal *(No need to add anything)*
 2. Large *(add the fragment `#large`)*
 3. Full *(you add the fragment `#full`)*

#### Example

```html
![Small image](//url-to-image.jpeg#small)

![Normal image](//url-to-image.jpeg)

![Large image](//url-to-image.jpeg#large)

![Full image](//url-to-image.jpeg#full)
```
 
### There's also a fourth way to display images, and that's using a gallery (or collage)
That is done in the following manner *(grouping together the images without an empty linebreak)*:
```html
![Gallery 1](//url-to-image.jpeg)
![Gallery 2](//url-to-image.jpeg)
![Gallery 3](//url-to-image.jpeg)
![Gallery 4](//url-to-image.jpeg)
![Gallery 5](//url-to-image.jpeg)
```

### Lightbox for your images
Saga supports lightbox for your images. The example above modified to work with lightbox would look like this:

```html
[![Gallery 1](//url-to-image.jpeg)](//url-to-larger-image.jpeg)
[![Gallery 2](//url-to-image.jpeg)](//url-to-larger-image.jpeg)
[![Gallery 3](//url-to-image.jpeg)](//url-to-larger-image.jpeg)
[![Gallery 4](//url-to-image.jpeg)](//url-to-larger-image.jpeg)
[![Gallery 5](//url-to-image.jpeg)](//url-to-larger-image.jpeg)
```
