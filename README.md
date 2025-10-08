# Y Web Components

A collection of web components built for vanilla JavaScript projects.

## Usage

This is under development and it's subject to change.

You can use it through a cdn like jsdelivr.

### Snack Bar Example

```html
<html>
</html>
<body>
<script type="module" src="https://cdn.jsdelivr.net/npm/@yrds/yweb-components@0.0.1/src/components/snack-bar/main.js"></script>
<snack-bar id="my-snack-bar"></snack-bar>

<script>
    const snackBar = document.getElementById('my-snack-bar');
    snackBar.open('Hello, World!', 1000); // Open the snack bar with a message for 1 second
</script>
</body>

```
