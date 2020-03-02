# Code Test

## Objective
Angular app returning filtered data using virtual scroll.

## Pagination and sorting
Based on the last trends, I've implemented a virtual scroll as the pagination. Doing so I could lift some work from the client and have the UX more fluid rather than having the traditional pagination approach.

## Load time
Since it was a simple demo(it's a single module as it is now), I couldn't reproduce some productions scenarios for this.
For more complex applications, I would have different modules being lazy loaded and some UI effects(percentage spinner or progress bar).

## Notes
Authentication and a few other security measures weren't implemented - no requirements for that.
