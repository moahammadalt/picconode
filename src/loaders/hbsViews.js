import fs from 'fs';
import path from 'path';
import hbs from 'hbs';

import config from 'config';

export default new (class hbsViews {
  constructor() {
    // singleton
    if (!!hbsViews.instance) {
      return hbsViews.instance;
    }
    hbsViews.instance = this;
  }

  initialize() {
    const viewsPath = path.join(path.resolve('.'), config.PUBLIC_VIEW_PATH);
    const partialsPath = viewsPath + 'partials';

    const filenames = fs.readdirSync(partialsPath);

    filenames.forEach(filename => {
      const matches = /^([^.]+).hbs$/.exec(filename);
      if (!matches) {
        return;
      }
      const name = matches[1];
      const template = fs.readFileSync(partialsPath + '/' + filename, 'utf8');
      hbs.registerPartial(name, template);
    });

    hbs.registerHelper('json', function(context) {
      return JSON.stringify(context, null, 2);
    });

    hbs.registerHelper('ifCond', function(v1, operator, v2, options) {
      switch (operator) {
        case '==':
          return v1 == v2 ? options.fn(this) : options.inverse(this);
        case '===':
          return v1 === v2 ? options.fn(this) : options.inverse(this);
        case '!=':
          return v1 != v2 ? options.fn(this) : options.inverse(this);
        case '!==':
          return v1 !== v2 ? options.fn(this) : options.inverse(this);
        case '<':
          return v1 < v2 ? options.fn(this) : options.inverse(this);
        case '<=':
          return v1 <= v2 ? options.fn(this) : options.inverse(this);
        case '>':
          return v1 > v2 ? options.fn(this) : options.inverse(this);
        case '>=':
          return v1 >= v2 ? options.fn(this) : options.inverse(this);
        case '&&':
          return v1 && v2 ? options.fn(this) : options.inverse(this);
        case '||':
          return v1 || v2 ? options.fn(this) : options.inverse(this);
        default:
          return options.inverse(this);
      }
    });

    hbs.registerHelper('ifCondIsEven', function(value, options) {
      return value % 2 === 0 ? options.fn(this) : options.inverse(this);
    });

    hbs.registerHelper('ifCondIsOdd', function(value, options) {
      return Math.abs(value % 2) === 1
        ? options.fn(this)
        : options.inverse(this);
    });

    hbs.registerHelper('render', function(str) {
      if (!str) {
        return '';
      }

      return new hbs.SafeString(str);
    });
  }
})();