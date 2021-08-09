# Table Edit Plugin

This plugin will help programmers to make a static table editable like the columns of a spreadsheet. Please check the following sample code to prompt user with a choice:
                               
                               $(<selector>).editable(...);
```
Parameters to the function:
•	Options
•	Callback – Function to be called after exceuting the HTTP request (Contains JSON response object).

@param {object} options for the hot keys.

      * options : {

          url : <String> URL of the page if the controls bind to a function on the server,
          baseParams: <String> Basic parameters to pass with the request.,
          method : <String> Request method (GET/POST)

      }

```
HTML structure of the table:

For each columns that will be editable consider adding `‘.editable-col’` to the class. The element will contain two elements with class `‘.editable-back’` and `‘editable-front‘`. The editable-back element will contain the html form element that will be shown when the user clicks on the page. Each html form element will also contain an attribute `‘data-index’` which will contain a unique id for to be passed along with the request. Check the HTML code below:


```
<td class="editable-col">
    <div class="editable-front">
        ....
    </div>
    <div class="editable-back">
        <select name="level" class="editable-bind form-control" data-index = 1>
		...
        </select>
    </div>
</td>
```

