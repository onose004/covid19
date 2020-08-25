import { configure } from '@storybook/react';
import { setConsoleOptions } from '@storybook/addon-console';
import React from 'react'
import { addDecorator } from '@storybook/react';

setConsoleOptions({
  panelExclude: []
});

function loadStories() {
  let req = require.context("../src", true, /.stories.(tsx|js)$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

