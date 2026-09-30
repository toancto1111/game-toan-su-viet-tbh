const apiKey = "AIzaSyDpyeR7SfZnmDPen3PKAPuIlYSh3qiICIc";
fetch('https://generativelanguage.googleapis.com/v1beta/models?key=' + apiKey)
  .then(r => r.json())
  .then(d => {
    if (d.models) {
      console.log(d.models.map(m => m.name).join(','));
    } else {
      console.log('Error:', d);
    }
  })
  .catch(console.error);
