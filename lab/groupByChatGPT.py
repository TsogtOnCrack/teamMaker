

def split_evenly(numbers):
    numbers.sort(reverse=True)
    groups = [[] for _ in range(4)]
    
    def backtrack(index):
        if index == len(numbers):
            return all(sum(group) % 2 == 0 for group in groups)
        
        for i in range(4):
            groups[i].append(numbers[index])
            if backtrack(index + 1):
                return True
            groups[i].pop()
        
        return False
    
    if backtrack(0):
        return groups
    else:
        return None

numbers = [12, 23, 43, 32, 54, 65, 23, 54, 65, 34, 67, 100, 0]
result = split_evenly(numbers)
if result:
    for idx, group in enumerate(result):
        print(f"Group {idx + 1}: {group} (Sum: {sum(group)})")
else:
    print("No solution found.")