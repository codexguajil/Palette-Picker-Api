exports.seed = function(knex, Promise) {
 
  return knex('palettes').del() // delete all palettes first
    .then(() => knex('projects').del()) // delete all projects

    // Now that we have a clean slate, we can re-insert our paper data
    .then(() => {
      return Promise.all([
        
        // Insert a single project, return the project ID, insert a palette
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
      ]) // end return Promise.all
    })
    .catch(error => console.log(`Error seeding data: ${error}`));
};
