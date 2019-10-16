const reorderList = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const reorder = (todoMap, source, destination) => {
  const current = [...todoMap[source.droppableId]];
  const next = [...todoMap[destination.droppableId]];
  const target = current[source.index];

  if (source.droppableId === destination.droppableId) {
    const reordered = reorderList(current, source.index, destination.index);
    const result = { ...todoMap, [source.droppableId]: reordered };
    return result;
  }

  current.splice(source.index, 1);
  next.splice(destination.index, 0, target);

  const result = {
    ...todoMap,
    [source.droppableId]: current,
    [destination.droppableId]: next,
  };

  return result;
};

export default reorder;
