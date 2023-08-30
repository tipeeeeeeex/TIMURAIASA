import { useCallback, useRef } from 'react';
import { Modal, Toast } from '@douyinfe/semi-ui';
import { IconSetting } from '@douyinfe/semi-icons';
import ConfigSetting from './index';
import useChatList from '@/hooks/useChatList';
import { Model } from '@/global';

function useConfigSetting() {
  const { config, handleConfigChange, chatList, handleDeleteAll } = useChatList();

  const configRef = useRef<any>();

  const open = useCallback((tips?: string, model?: Model) => {
    const preConfig = { ...(config || {}) };
    configRef.current = Modal.info({
      header: (
        <div className="py-6 font-semibold flex items-center">
          <IconSetting className="mr-2" />
          Setting
        </div>
      ),
      style: { maxWidth: '100%' },
      width: '900px',
      bodyStyle: { marginLeft: 0 },
      content: (
        <ConfigSetting
          chatList={chatList}
          tips={tips}
          model={model}
          handleConfigChange={handleConfigChange}
          handleDeleteAll={handleDeleteAll}
          config={config}
        />
      ),
      okText: 'Sacuvaj',
      cancelText: 'Odustani',
      onOk: () => {
        Toast.success('Uspješno sacuvano');
      },
      onCancel: () => {
        handleConfigChange(preConfig);
      },
      afterClose: () => {
        configRef.current?.destroy();
      }
    });
  }, [config, chatList, handleConfigChange, handleDeleteAll]);

  return open;
}

export default useConfigSetting;
