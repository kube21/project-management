export default [
  {
    type: 'project',
    name: 'Projects',
    key: 'projects'
  },
  {
    type: 'user',
    name: 'Users',
    key: 'users'
  },
  {
    type: 'plus',
    name: 'Create',
    key: 'create',
    menuSubItem: [
      {
        type: 'plus',
        name: 'Project',
        key: 'create-project'
      },
      {
        type: 'plus',
        name: 'User',
        key: 'create-user'
      }
    ]
  },
];
