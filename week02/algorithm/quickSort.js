const qucikSort1 = (list) => {
	if (list.length) {
		const mid = list[0];
		const left = [], right = [], n = list.length;
		for(let i = 1; i < n; i++) {
			if (list[i] <= mid) {
				left.push(list[i]);
			} else {
				right.push(list[i]);
			}
		}
		return [...qucikSort(left), mid, ...qucikSort(right)];
	}
	return [];
}
// partition （切分优化版）
const swap = (list, idx1, idx2) => {
		[
			list[idx1],
			list[idx2]
		] = [
			list[idx2],
			list[idx1]
		]
}
const partition = (list, left, right) => {
    const mid = list[(right + left) >> 1];
    let i = left, j = right;
    while (i <= j) {
        while (list[i] < mid) {
            i++;
        }
        while (list[j] > mid) {
            j--;
        }
        if (i <= j) {
            swap(list, i, j);
            i++;
            j--;
        }
    }
    return i;
}
const quickSort2 = (items, left, right) => {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort2(items, left, index - 1);
        }
        if (index < right) {
            quickSort2(items, index, right);
        }
    }
    return items;
}
