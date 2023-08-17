import random

data = []

for i in range(13):    
    data.append(random.randint(0,100))
    
groupCount = 3

def findAverage(arr, n):
    
    sum = 0
    for el in arr:
        sum += el
    
    return sum/n



#sort data
sortedData = []

for el in data:
    sortedData.append(el)
sortedData.sort(reverse=True)
sortedData.append("none")
print(data, "data")
print(sortedData, "sorted data")

AV = findAverage(data, groupCount)
print(AV)



#actually grouping
def group():
    ans = []
    ind = 0
    while (True):
        for i in range(groupCount):
            
            
            
            k = 3-i #this is the reverse
            
            
            if( ind % 2 ==0):#if ind is even
                j = i + (ind * groupCount)
            else:
                j = k + (ind * groupCount)
            
            if(ind == 0):
                ans.append([])
            
            if(sortedData[j] != "none"):
                ans[i].append(sortedData[j])
            else:
                print ("Result: ", ans) # print function here
                
                h = 0
                for el in ans:
                    h +=1
                    print("Group", h, ":", el, "  (sum:", sum(el), ")")
                
                return
        
        ind += 1
group()
