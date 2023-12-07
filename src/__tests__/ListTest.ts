export function test_list(list: List<number>): void {
    list.append(5);
    list.append(7);
    list.append(9);

    expect(list.get(2)).toEqual(9);
    expect(list.removeAt(1)).toEqual(7);
    expect(list.length).toEqual(2);

    list.append(11);
    // console.log("before test a", list.length);
    // console.log("BEFORE", list);
    expect(list.removeAt(1)).toEqual(9);
    // console.log("AFTER", list);
    console.log("in test a");
    // console.log("before test b", list.length);
    expect(list.remove(9)).toEqual(undefined);
    console.log("in test b");
    expect(list.removeAt(0)).toEqual(5);
    expect(list.removeAt(0)).toEqual(11);
    expect(list.length).toEqual(0);

    list.prepend(5);
    list.prepend(7);
    list.prepend(9);

    expect(list.get(2)).toEqual(5);
    expect(list.get(0)).toEqual(9);
    expect(list.remove(9)).toEqual(9);
    expect(list.length).toEqual(2);
    expect(list.get(0)).toEqual(7);
}
