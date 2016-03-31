var Store = require('flux/utils').Store,
    AppDispatcher = require('../dispatcher/dispatcher.js'),
    ApiConstants = require('../constants/api_constants');

var _tasks = {};
var TaskStore = new Store(AppDispatcher);

TaskStore.all = function () {
  return _tasks;
};

var resetTasks = function (newTasks) {
  _tasks = {};
  for (var j = 0; j < newTasks.length; j++) {
    var currentTask = newTasks[j];
    _tasks[currentTask.id] = currentTask;
  }
};

var receiveOneTask = function (task) {
  _tasks[task.id] = task;
};

TaskStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case ApiConstants.RECEIVE_TASKS:
      resetTasks(payload.tasks);
      TaskStore.__emitChange();
      break;
    case ApiConstants.RECEIVE_ONE_TASK:
      receiveOneTask(payload.task);
      TaskStore.__emitChange();
      break;
  }
};

module.exports = TaskStore;