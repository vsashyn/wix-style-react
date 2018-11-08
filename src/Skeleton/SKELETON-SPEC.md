# Content Skeleton
## What is it?
Content Skeleton is a “placeholder” to be shown while fetching data from a server (or any other long async task).

## Why do we need it?
The Content Skeleton’s main goal is to improve perceived performance. Instead of just show a blank page or a spinner, we show content which somewhat resembles the content which will soon be displayed on the screen.

## Where do we need it?
A Content Skeleton is already in use in the Business Manager’s Home (dashboard), inbox, and we now need one for the Contact Panel.

## Behavior
The component can be rendered anywhere (card, whole page, etc). The margin between the first line and the rest of the lines is always doubled compared to the spacing between the other lines (even when using small/medium/large spacing).

## API
A React component which has the following props:

* content (array) - An array of objects which represent which elements and how long they should be:
  * type (string) - “line” (only option for now).
  * width (string) - One of “small”, “medium”, “large”.

* alignment (string) - One of “start” (default), “middle”, “end”.
* spacing (string) - One of “small”, “medium” (default), “large”.
