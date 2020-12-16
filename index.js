// !!! Sharing the dependencies of caz
module.paths = require.main.paths

const path = require('path')
const chalk = require('chalk')
const { name, version } = require('./package.json')

const date = new Date()

module.exports = {
  name,
  version,
  metadata: {
    year: date.getFullYear(),
    month: ('0' + (date.getMonth() + 1)).substr(-2),
    day: ('0' + date.getDate()).substr(-2)
  },
  prompts: [
    {
      name: 'name',
      type: 'text',
      message: '项目名称：'
    },
    {
      name: 'version',
      type: 'text',
      message: '项目初始版本：'
    },
    {
      name: 'description',
      type: 'text',
      message: '项目描述：',
      initial: 'Typescript 项目'
    },
    {
      name: 'author',
      type: 'text',
      message: '作者：'
    },
    {
      name: 'email',
      type: 'text',
      message: '作者邮箱：'
    },
    {
      name: 'url',
      type: 'text',
      message: '作者主页（github或掘金）：',
      initial: 'https://juejin.cn/user/668105060404104'
    },
    {
      name: 'license',
      type: 'select',
      message: '项目的license：',
      hint: ' ',
      choices: [
        { value: 'MIT' },
      ]
    },
    {
      name: 'github',
      type: 'text',
      message: 'Github账号或者Github组织名称：',
      initial: 'saltire'
    },
    {
      name: 'install',
      type: 'confirm',
      message: '是否立即安装依赖：',
      initial: true
    },
    {
      name: 'pm',
      type: prev => process.env.NODE_ENV === 'test' || prev ? 'select' : null,
      message: '请选择npm包管理工具：',
      hint: ' ',
      choices: [
        { title: 'npm', value: 'npm' },
        { title: 'yarn', value: 'yarn' }
      ]
    }
  ],
  filters: {
    /** @param {{ features: string[] }} answers */
    'plugins/saltire_util.js': answers => answers.saltire_util,
  },
  install: 'npm',
  init: true,
  setup: async ctx => {
    ctx.config.install = ctx.answers.install && ctx.answers.pm
  },
  complete: async ctx => {
    console.clear()
    console.log(chalk.green(`\n ## 使用模板[${ctx.template}]成功创建了项目： ${ctx.project}\.\n`))
    console.log(chalk.green(`\n ## 现在你可以使用它了,尝试进入该项目运行 npm run dev ~~`))
  }
}
