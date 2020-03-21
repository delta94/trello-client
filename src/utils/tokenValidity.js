export const tokenValidity = (err, history) => {
  if (err) {
    console.log(err.response)
    if (err && err.response && err.response.data.invalid) return history.push("/login");
  }
}
