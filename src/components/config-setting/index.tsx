import React, { useCallback, useState } from 'react';
import { Form, Tabs, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import PromptStore from '@/components/prompt-store';
import GeneralConfig from '@/components/general-config';
import { Config, Model, MultiConfig } from '@/global';
import { API_HOST_LIST } from '@/utils/env';
import { ConfigSettingProps } from './ConfigSetting';

const ConfigSetting: React.FC<ConfigSettingProps> = function ConfigSetting(props) {
  const {
    handleConfigChange, config: defaultConfig, model: currentModel, tips, chatList, handleDeleteAll 
  } = props;

  const [model, setModel] = useState<Model>(currentModel || 'gpt-3.5-turbo');
  const [multiConfig, setMultiConfig] = useState<MultiConfig>(defaultConfig);

  const handleValuesChange = useCallback((values: Config) => {
    const cacheConfig = JSON.parse(JSON.stringify(multiConfig));
    cacheConfig[model] = { ...values, model };
    handleConfigChange(cacheConfig);
    setMultiConfig(cacheConfig);
  }, [handleConfigChange, model, multiConfig]);

  const labelTips = useCallback((content: string) => (
    <Tooltip content={content}><IconHelpCircle className="pt-[2px]" /></Tooltip>
  ), []);

  const config = multiConfig[model] || {};
  const API_HOST = API_HOST_LIST[model];

  return (
    <Tabs>
      <Tabs.TabPane tab="Model Setting" itemKey="0">
        <div className="my-2 text-[#444] dark:text-[#ddd]">
          Ovdje unesite vaš TIMUR AI KLJUC
        </div>
        <Form labelPosition="left">
        </Form>
        <Form key={model} labelPosition="left" onValueChange={handleValuesChange}>
          <Form.Input
            field="apiKey"
            initValue={config.apiKey}
            label={{ text: 'TIMUR AI KLJUC', extra: labelTips('U koliko ne znate sta je i kako se kupuje, obratite se na instagram : timurrr.js') }}
            showClear
          />
          {tips ? <div className="text-[#ff0000]">{tips}</div> : null}
          
        </Form>
      </Tabs.TabPane>
      <Tabs.TabPane tab="TEMA" itemKey="1">
        <GeneralConfig chatList={chatList} onDelete={handleDeleteAll} />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default ConfigSetting;
