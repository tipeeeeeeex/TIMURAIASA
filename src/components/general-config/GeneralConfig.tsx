import React, { useState } from 'react';
import { Button, Form, Popconfirm, Toast } from '@douyinfe/semi-ui';
import type { RadioChangeEvent } from '@douyinfe/semi-ui/lib/es/radio';
import { GeneralConfigProps } from './GeneralConfigProps';

export type Mode = 'light' | 'dark' | 'auto' | false;

const GeneralConfig: React.FC<GeneralConfigProps> = function GeneralConfig(props) {
  const { chatList, onDelete } = props;

  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window.matchMedia === 'function') {
      const theme = localStorage?.getItem('theme') as Mode;
      if (theme) return theme;
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const html = document.getElementsByTagName('html')[0];
      if (html.className.includes('dark')) return 'dark';
      if (html.className.includes('light')) return 'light';
      return darkMode ? 'dark' : 'light';
    }
    return false; // 表示不支持暗色模式
  });

  const changeTheme = (theme: 'dark' | 'light') => {
    const html = document.getElementsByTagName('html')[0];
    html.classList.remove(theme === 'light' ? 'dark' : 'light');
    html.classList.add(theme);
    html.style.colorScheme = theme;
    document.body.setAttribute('theme-mode', theme);
    if (theme === 'light' && document.body.hasAttribute('theme-mode')) {
      document.body.removeAttribute('theme-mode');
    }
  };

  const handleChangeMode = (event: RadioChangeEvent) => {
    const { value } = event.target;
    setMode(value);
    localStorage?.setItem('theme', value);
    if (value === 'dark' || value === 'light') {
      changeTheme(value);
    } else {
      const darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      changeTheme(darkMode ? 'dark' : 'light');
    }
  };

  return (
    <Form labelPosition="left">
      {mode && (
        <Form.RadioGroup field="Tema" initValue={mode} onChange={handleChangeMode}>
          <Form.Radio value="light">Svjetlo</Form.Radio>
          <Form.Radio value="dark">Tamno</Form.Radio>
          <Form.Radio value="auto">Automatska</Form.Radio>
        </Form.RadioGroup>
      )}
      <Form.Slot label="Obriši sve razgovore">
        {chatList?.length > 0 && (
          <Popconfirm
            title="Da li si siguran da želiš obrisati sve razgovore?"
            content="Kada se jednom obrišu, niko ih ne može vratiti."
            okText="Prihvati"
            cancelText="Odustani"
            onConfirm={() => {
              onDelete();
              Toast.success('Brisanje uspješno');
            }}
          >
            <Button className="bg-[var(--semi-color-danger)]" theme="solid" type="danger">
              OBRIŠI
            </Button>
          </Popconfirm>
        )}
      </Form.Slot>
    </Form>
  );
};

export default GeneralConfig;
