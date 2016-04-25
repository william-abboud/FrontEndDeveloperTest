#Q: Consider HTML5 as an open web platform. What are the building blocks of HTML5, and the purpose of each of them ?
A:
1. Semantics - HTML5 brings more semantic elements allowing developers to better describe the nature of their content. This helps Search Engines to perform optimizations and better reason about a websites' content.
2. Offline and storage - APIs provided in this area allow web developers more control over storing data locally via the local storage and safe state even when the connection is down.
3. Multimedia - Forget Flash, with HTML5 developers can take advantage of the new audio and video HTML elements.

#Q: Explain Ajax
A: AJAX stands for Asynchronous JavaScript and XML. The XMLHttpRequest object exposed to the JavaScript via the browser allows developers to create connections to the server (synchronous or more preferably asynchronous) and exchange data without having to reload the browser. The data need not be set in XML format and most of the time JSON is actually the preferred format. This technique allows web applications to send or retrieve data from the server dynamically thus decoupling the presentation layer (view) from the data layer (model).


#Q: In HTML, what does a doctype do, and how many can you name?
A: The Document Type Declaration or shortly DOCTYPE is an instruction to the rendering engine notifying it about the current document type definition (DTD). Document Type Definition defines the legal building blocks of a HTML document. Such building blocks are the legal elements, attributes and comments.

#Q: In JavaScript, what is the difference between an "attribute" and a "property"?
A: Attributes resign on HTML elements. Properties on the other hand are named words on an object which contain a value. For example the id attribute on an element holds a unique identifier for that HTML element. As for objects:

  ```javascript
    { name: 'William'};
  ```
  The property name of the object above contains the value 'William'. Properties on objects are key-value pairs. Where the property value can be retrieved from the key.

#Q: In CSS, what is a "reset" CSS file and why is it useful?
A: Resets files usually contain generic styles applied to multiple elements to nullify differences between browsers. Each browser sets default styles for certain elements that may or may not be the same for another browser. Since there is no standard for default style across elements a developer cannot rely on an element's look to be exactly the same in every browser. Reset stylesheets help flat out the differences in default styling of HTML elements.

#Q: Explain CSS sprites; why would you use them, and how you would implement them on a page or site?
A: CSS sprites are image files which contain multiple smaller images spaced out from one another in a precise manner. CSS sprites are used to reduce the loading time of websites by combining multiple small image assets of similar nature such as icons into one image. Downloading one image vs multiple smaller images reduces the download time because the number of requests is fewer. To implement them simply request the file for example with CSS:

  ```css
   background: url('sprite.png') no-repeat;
  ```

  Then simply use the `background-position` property to navigate in the sprite image and grab the exact smaller image in it.

  ```css
   .facebook-icon {
     background-position: top left;
   }
  ```


#Q: What kind of things must you be wary of when design or developing for multilingual sites?
A: Hardcoded URLs in the JavaScript might break the JS if a non-english URL is used. If the JavaScript relies on data attributes to grab options such as an error message to display. The programmer must make sure the data error message option is localized just as normal text is.

#Q: What is the difference between standards mode and quirks mode?
A: When there is no correct DOCTYPE declaration set the browser switches to Quirks mode, meaning it will try to parse the document but will not adhere to the W3C standards.

#Q: HTML/CSS class vs. id: when should class be used and when should id – and why?
A: ID should not be used to target css elements. The concept of specificity meaning the weight of a selector gives the ID selector the strongest specificity. Thus if a developer tries to overwrite styles on an element from a different selector such as class selector they will not be able to because ID selectors take precedence. E.g:

```css
 #some-box {
   color: red;
 }

 .box {
  color: black;
 }
```

```html
 <div id="some-box" class="box"></div>
```

In the example above we want the all boxes to have color of black. However #some-box overwrites that which we don't want.

#Q: What are the benefits of a CSS grid system?
A: Grid systems in general provide a meter and rhythm to create a more balanced layout.

#Q: What are major pitfalls of CSS media queries?
A: You have to decide on a set of guidelines breakpoints beforehand and stick the whole project to them. The syntax is also long and you need a CSS preprocessor to make it shorter and nest it inside a selector otherwise all styles for all selectors have to go in one media query usually stuck at the bottom of a css document. The drawback of that is that the developer has to scroll up and down to look at the styles before and in the media query. P.S CSS Preprocessors address these drawbacks and makes the usage of media queries a breeze.

#Q: What are critical user/customer security concerns on JS/CSS/HTML level?
A:
1.Client XSS - Cross-Site Scripting occurs when executable code is added in input fields and the value of the input fields is not validated. The value is then sent to the server and it can cause havoc.

#Q: How would you optimize a website's assets/resources?
A: I would use CSS sprites to combine multiple smaller images into one. I would use base64 encoding for very small image files. I would minify and uglify my scripts. I would also concatenate all my scripts into one javascript file and if possible use tree shaking to only load the javascript that is needed for that particular page. For any 3rd party javascript files I would give the script element the attribute of async. For images - first I will compress the images using a compressing tool. I use Kraken. https://kraken.io/. I would avoid loading fonts from external websites and keep the fonts to a minimum. If the websites displays a lot of images e.g more than 50 per webpage I would use a lazy image loading tool such as http://luis-almeida.github.io/unveil/. I would minify my CSS files and if possible use https://github.com/ben-eb/gulp-uncss.

#Q: What are key JS/CSS/HTML changes you would make to uk.madbid.com and why?
A:
 1. Use class selectors instead of id selectors
 2. Minify CSS
 3. Remove gif images and use sprite images. To create a spinner I would use css animations and transforms
 4. Any 3rd party JS scripts should be given the `async` attribute to delegate the loading of that script.
 5. I would make it responsive
 6. Stop using floating for laying out pages and use Flexbox if browser support allows
 7. Don't mix naming of classes. Stick to one naming convention.
 8. Only load content images as through image tags everything else via the `background-image` property.
 9. Anchor tags should have `href` attributes.
 10. Use semantic elements for example `<header>` instead of `<div id="top_header>`

#Q: What's your favorite feature of Internet Explorer?
A: I can use it successfully to download another browser.

#Q: What is LESS ? What are its benefits and limitations?
A: LESS is a CSS preprocessor used to ease the writing of CSS and is composed of features which help developers create more maintainable and scalable stylesheets. CSS preprocessors in general add syntax and features which are not in the CSS specification but successfully compiles to a valid CSS.
  Cons:
    1. More process - You need an extra step in your workflow a compiling and usually a watching process to compile LESS to CSS.
    2. Team coordination - Everyone on the team will have to use LESS
    3. Learning Curve - You and everyone on the team has to learn the syntax
    4. May not be necessary - It may be an overkill for a small time project
  Pros:
    1. Variables - Variables allow you to save state and reuse that state meaningfully where your application demands it.
    2. Mixins - Mixins allow you to mix properties from existing styles.
    3. Imports - Allows you to import a CSS or LESS document into another document without having to retrieve it from the server.
