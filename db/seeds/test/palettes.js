exports.seed = function(knex, Promise) {
 
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      return Promise.all([
        
        knex('projects').insert({
          title: 'House Decor'
        }, 'id')
        .then(project => {
          return knex('palettes').insert([
            { name: 'House Decor', color1: 'red', color2: 'green', color3: 'orange', color4: 'purple', color5: 'white', project_id: project[0] }
          ])
        })
        .then(() => console.log('Seeding complete!'))
        .catch(error => console.log(`Error seeding data: ${error}`))
      ])
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};