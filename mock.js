const WEB_HOOK_GITHAB = {
  commits: [
    {
      id: 'fc44af1d38292a1c37265728e3e3daa512d33d6a',
      tree_id: 'f8bbd3704ba5288efccece6680765285f9850eee',
      distinct: true,
      message: 'Update: Finish Step 1 on Tour of Heroes App',
      timestamp: '2020-01-28T07:25:30+02:00',
      url: 'https://github.com/Dementeey/home-cloud-frontend/commit/fc44af1d38292a1c37265728e3e3daa512d33d6a',
      author: [],
      committer: [],
      added: [],
      removed: [],
      modified: []
    }
  ],
  head_commit: {
    id: 'fc44af1d38292a1c37265728e3e3daa512d33d6a',
    tree_id: 'f8bbd3704ba5288efccece6680765285f9850eee',
    distinct: true,
    message: 'Update: Finish Step 1 on Tour of Heroes App',
    timestamp: '2020-01-28T07:25:30+02:00',
    url: 'https://github.com/Dementeey/home-cloud-frontend/commit/fc44af1d38292a1c37265728e3e3daa512d33d6a',
    author: {
      name: 'Anton L',
      email: 'metallist9656@gmail.com',
      username: 'Dementeey'
    },
    committer: {
      name: 'Anton L',
      email: 'metallist9656@gmail.com',
      username: 'Dementeey'
    },
    added: [
      'src/app/hero.ts',
      'src/app/heroes/heroes.component.html',
      'src/app/heroes/heroes.component.scss',
      'src/app/heroes/heroes.component.spec.ts',
      'src/app/heroes/heroes.component.ts'
    ],
    removed: [],
    modified: [
      'src/app/app.component.html',
      'src/app/app.component.ts',
      'src/app/app.module.ts'
    ]
  }
}

const WEB_HOOK_GITLAB = {
  object_kind: 'push',
  event_name: 'push',
  before: 'f097dd0627175d8b850164e08466c1b6cb5479e7',
  after: '31848fd4de498f9f0ae1681d945631b92fbf9b58',
  ref: 'refs/heads/dev',
  checkout_sha: '31848fd4de498f9f0ae1681d945631b92fbf9b58',
  message: null,
  user_id: 4024677,
  user_name: 'Anton. L.',
  user_username: 'metallist9656',
  user_email: '',
  user_avatar:
    'https://assets.gitlab-static.net/uploads/-/system/user/avatar/4024677/avatar.png',
  project_id: 12682725,
  project:
  {
    id: 12682725,
    name: 'Home Cloud',
    description: '',
    web_url: 'https://gitlab.com/home-cloud-private/home-cloud-frontend',
    avatar_url:
      'https://gitlab.com/uploads/-/system/project/avatar/12682725/download.png',
    git_ssh_url: 'git@gitlab.com:home-cloud-private/home-cloud-frontend.git',
    git_http_url:
      'https://gitlab.com/home-cloud-private/home-cloud-frontend.git',
    namespace: 'Cloud',
    visibility_level: 0,
    path_with_namespace: 'home-cloud-private/home-cloud-frontend',
    default_branch: 'dev',
    ci_config_path: null,
    homepage: 'https://gitlab.com/home-cloud-private/home-cloud-frontend',
    url: 'git@gitlab.com:home-cloud-private/home-cloud-frontend.git',
    ssh_url: 'git@gitlab.com:home-cloud-private/home-cloud-frontend.git',
    http_url:
      'https://gitlab.com/home-cloud-private/home-cloud-frontend.git'
  },
  commits:
    [{
      id: '31848fd4de498f9f0ae1681d945631b92fbf9b58',
      message: 'Init: Create Angular\n',
      timestamp: '2020-01-13T21:56:39+02:00',
      url:
        'https://gitlab.com/home-cloud-private/home-cloud-frontend/commit/31848fd4de498f9f0ae1681d945631b92fbf9b58',
      author: [Object],
      added: [Array],
      modified: [Array],
      removed: []
    }],
  total_commits_count: 1,
  push_options: {},
  repository:
  {
    name: 'Home Cloud',
    url: 'git@gitlab.com:home-cloud-private/home-cloud-frontend.git',
    description: '',
    homepage: 'https://gitlab.com/home-cloud-private/home-cloud-frontend',
    git_http_url:
      'https://gitlab.com/home-cloud-private/home-cloud-frontend.git',
    git_ssh_url: 'git@gitlab.com:home-cloud-private/home-cloud-frontend.git',
    visibility_level: 0
  }
}

const parserGitLabWebhook = data => ({
  eventName: data.event_name,
  user: {
    name: data.user_name,
    avatar: data.user_avatar,
  },
  project: {
    name: data.project.name,
    url: data.project.web_url,
  },
  commits: data.commits,
  sshUrl: data.repository.git_ssh_url
})


console.log(parserGitLabWebhook(WEB_HOOK_GITLAB))