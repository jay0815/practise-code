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
const quickSort = (items, left, right) => {
    let index;
    if (items.length > 1) {
        index = partition(items, left, right);
        if (left < index - 1) {
            quickSort(items, left, index - 1);
        }
        if (index < right) {
            quickSort(items, index, right);
        }
    }
    return items;
}

const topK = (list, k) => {
    const n = list.length;
    if (k > list.length) {
        return null;
    }
    const sorted = quickSort(list, 0, n-1);
    return sorted[k];
}