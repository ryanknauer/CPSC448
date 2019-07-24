Our update step consists of the following:  

Our update step consists of the following:
 
Where  = recursive step;  = transition step;  = observation step
For the observation step, with a single value  this would normally just be an index into our observation model.
For example if the observation model gives us the below at index z,x :
      
So if  
If instead  is a multi-dimensional vector representing the observed probability of each emotional state. We could then represent  as weighted combination of each possible state given by: 
 
which is equivalent to taking the dot product of  and .
For example if our observation returned unconfident score of  we would get: 
  
This would be a much more accurate representation of the unconfident observation. 



