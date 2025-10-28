# Простой деплой с FTP-Sync

## Настройка FTP-Sync

### 1. Конфигурация подключения
Отредактируйте `.vscode/ftp-sync.json`:

```json
{
    "remotePath": "/public_html/",
    "host": "ваш-ftp-сервер.com",
    "username": "ваш-логин", 
    "password": "ваш-пароль",
    "port": 21,
    "secure": false,
    "protocol": "ftp"
}
```

### 2. Быстрый деплой

#### Вариант 1: Через Tasks (рекомендуется)
1. `Ctrl+Shift+P` → **Tasks: Run Task**
2. Выберите **Build and Prepare for FTP**
3. После сборки: `Ctrl+Shift+P` → **FTP-Sync: Sync Local to Remote**

#### Вариант 2: Ручной деплой
1. Сначала сборка: `npm run build`
2. `Ctrl+Shift+P` → **FTP-Sync: Sync Local to Remote**

## Команды FTP-Sync

- **FTP-Sync: Sync Local to Remote** - загрузить локальные файлы на сервер
- **FTP-Sync: Sync Remote to Local** - скачать файлы с сервера  
- **FTP-Sync: Upload** - загрузить текущий файл
- **FTP-Sync: Download** - скачать текущий файл
- **FTP-Sync: List** - показать файлы на сервере
- **FTP-Sync: Diff** - сравнить локальные и удаленные файлы

## Автоматизация

### Сценарий быстрого деплоя:

1. **Сборка**: `Ctrl+Shift+P` → Tasks: Run Task → **Build Project**
2. **Деплой**: `Ctrl+Shift+P` → **FTP-Sync: Sync Local to Remote**

### Настройка горячих клавиш

Добавьте в `keybindings.json`:
```json
[
  {
    "key": "ctrl+alt+u", 
    "command": "ftpSync.syncLocalToRemote"
  },
  {
    "key": "ctrl+alt+b",
    "command": "workbench.action.tasks.runTask",
    "args": "Build Project"
  }
]
```

## Конфигурация ignore

В `ftp-sync.json` настроены исключения для загрузки только папки `dist`:

```json
"ignore": [
    "\\.vscode",
    "\\.git", 
    "node_modules",
    "src",
    "public",
    "scripts",
    "docs",
    "*.md",
    "*.json",
    "*.js",
    "*.config.*"
]
```

## Безопасность

1. **Не коммитьте** `ftp-sync.json` с паролями в git
2. Используйте переменные окружения или отдельный конфиг файл
3. Добавьте в `.gitignore`:
   ```
   .vscode/ftp-sync.json
   ```

## Протоколы

FTP-Sync поддерживает:
- **FTP** - обычный FTP
- **FTPS** - FTP с SSL/TLS (`"secure": true`)
- **SFTP** - SSH File Transfer Protocol (`"protocol": "sftp"`)

## Преимущества FTP-Sync

✅ **Простота** - никаких сложных скриптов  
✅ **GUI** - удобный интерфейс VS Code  
✅ **Быстрота** - загружает только измененные файлы  
✅ **Безопасность** - поддержка SFTP и FTPS  
✅ **Гибкость** - тонкая настройка фильтров  

## Workflow

```
1. Разработка → 2. npm run build → 3. FTP-Sync: Sync Local to Remote
```

Всё! Ваш сайт обновлен на сервере.