export const tokenValidity = (err, history) => {
  if (err !== null) {
    if (err.response.data.invalid) return history.push("/login");
  }
}
