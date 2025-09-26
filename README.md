[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/PA8fMuFu)
# Homework 1 AI Synthesis Activity

Only complete one of the assignments below! You can delete the other assignment in this document once you've made your choice.
** I did not use AI for this assignment **

## Activity B: You did NOT use AI
### Part 1
> Explain some improvement you want to make within your code. Perhaps you have a code block that could be more concise, or a part of your code could be improved with a library or be performed with a more efficient algorithm.

I feel like out of all the functions I wrote in analysis.js, I could definetly optimize summaryStatistics(), as there are many different factors to keep track of, and my code got a little cluttered as I was writing it. I could definetly calculate all the statistics in a more efficient way without using as much space I did, and I want to see if AI has any possible optimizations or any suggestions for planning and thinking about my code more before I start coding. 


### Part 2
> Ask AI how to improve your code, by picking a part of your program you are interested in improving and asking something along the lines of "how can I improve this code?" This does not have to be verbatim; you could ask more specific questions for improvement, like "what JavaScript libraries could improve the efficiency of my code?" Screenshot or link the response.

https://chatgpt.com/share/68d5dc29-08d0-800c-9462-22b00c97599a - Link to my prompt and the response Chat-GPT gave me

### Part 3
> Evaluate the response the AI generates. You may need to do some research to do this evaluation, to see if the syntax generates correctly or if any libraries the AI suggests are appropriate for the current task. Report on whether the AI's solution fits within your project, or if it would need modifications to work properly.

Looking at the response, I think the suggestion AI generated is helpful, as it provides a different Data Structure for storing my data as I iterate through the file. By using the map, I can get O(1) retrieval of the values of reviewCounts, appRatings and what devices were used for each app. Additionally, I really liked the suggestion of tracking the mostReviewed app as I iterate through the data, as it allows us to not go through and iterate again later when trying to get the return output. I had never seen the .reduce() function before, but it seems really helpful with going through all the data and once and optimizing the number of iterations we have through the data. Furthermore, I don't think any other JS libraries would've helped with this, as the dataset was not too large and was able to be broken down pretty easily just by using various Objects in JS. The AI's solution definetly fits within my project, as it could optimize the solution by using maps and reducing the amount of code I would have to write. However, I like the way my code is written out, as I understand it in terms of getting each return output individually by building various objects. 

*** You do NOT need to use the AI suggestion within your final submission, if your code already works properly. If the scope of your inquiry in this activity leads you to replace parts of your code, switch to the other version of this activity instead. ***