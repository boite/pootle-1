/*
 * Copyright (C) Pootle contributors.
 *
 * This file is a part of the Pootle project. It is distributed under the GPL3
 * or later license. See the LICENSE file for a copy of the license and the
 * AUTHORS file for copyright and authorship information.
 */

import Backbone from 'backbone';
import 'odometer';


var Score = Backbone.Model.extend({
  validate: function (attrs) {
    var value = attrs.value;

    if (value === undefined || value === null) {
      return 'Not a number';
    }

    if (value % 1 !== 0) {
      return 'Not an integer';
    }
  },
});


var ScoreView = Backbone.View.extend({
  el: '.js-score',

  events: {
    'odometer-digit-added': 'updateWidth',
  },

  updateWidth: function () {
    var elWidth = this.$el.find('.odometer-inside').width();
    var newWidth = elWidth === 0 ? 'auto' : elWidth;
    if (this.oldWidth !== newWidth) {
      this.$el.css('width', newWidth);
      this.oldWidth = newWidth;
    }
  },

  initialize: function () {
    this.oldWidth = -1;
    this.updateWidth();
    this.listenTo(this.model, 'change:value', this.render);
  },

  render: function () {
    this.$el.text(this.model.get('value'));
    return this;
  },

});


var scoreModel;


export function init(initialScoreValue) {
  scoreModel = new Score({value: initialScoreValue}, {validate: true});
  new ScoreView({model: scoreModel});
}


export function set(newScore) {
  scoreModel.set({value: newScore}, {validate: true});
  return this;
}

export function get() {
  return scoreModel.get('value');
}


export default {
  init,
  get,
  set,
};
