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
# sortedData.append("none")

print(data, "data")
print(sortedData, "sorted data")


def findSmallestSum (ar):
    min = [999]
    for el in ar:
        if(sum(el) < sum(min)):
            min = el
    return min     


print("start greedy")
def Greedy():
    
    #make the groups for the data to fall into
    ans = []
    for i in range(groupCount):
        ans.append([])
    
    print(ans)
    #loop through sorted algorithm
    for el in sortedData:
        
        
        smallestSumArray = findSmallestSum(ans)
        print(smallestSumArray)
        
        for e in ans: # find smallest array in: ans
            if e == smallestSumArray:
                print("set:" , e, "to:", el)
                e.append(el)
                print(e)
                break
               
    #print the ans
    
    h=0
    for el in ans:
        h+=1
        print("Group", h, ":", el, "  (sum:", sum(el), ")")
        
Greedy()
    

