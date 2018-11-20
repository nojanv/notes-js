var update = document.getElementById('update');

if (update) {
update.addEventListener('click', function() {
    fetch('quotes', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'name': 'Sepehr',
        'quote': 'I work at Sequr!'
      })
    }).then(res => {
      if (res.ok) return res.json()
    }).then(data => {
      console.log(data);
      window.location.reload(true)
    });
  });
}

var del = document.getElementById('delete');
if (del) {
  del.addEventListener('click', function() {
    fetch('quotes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        'name': 'Sepehr'
      })
    })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload();
    })
  });
}

if (del) {
  del.addEventListener('click', function() {
    fetch('quotes', {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify( {
        'name': 'Nouzhan'
      })
    })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
      window.location.reload();
    })
  });
}