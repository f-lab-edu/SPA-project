export async function fetchAllData() {
  const response = await fetch('/mock/posts.json');
  return await response.json();
}

export async function fetchCategoryData(category) {
  const response = await fetchAllData();
  return response.filter((item) => item.category === category);
}

export async function fetchDetailData(id) {
  const response = await fetchAllData();
  return response.find((item) => item.id == id);
}
