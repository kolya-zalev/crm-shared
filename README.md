# @crm/shared

Общие контракты и код для микросервисов CRM: `crm-gateway`, `crm-users-service`, `crm-leads-service`.
Фронт этот пакет **не использует**.

## Что внутри

| Папка | Что |
|---|---|
| `src/contracts` | имена сообщений (`messages`, `leadsMessages`), типы payload/ответов (`UsersContract`, `LeadsContract`), `Actor`, роли и права, константы портов |
| `src/common` | `ServiceClient` (таймаут 5 с, ошибки → HttpException, 503 при недоступности), `HttpToRpcExceptionFilter` |

## Установка

```bash
npm install github:kolya-zalev/crm-shared#v1.0.0
```

```ts
import { messages, type Actor, ServiceClient } from "@crm/shared";
```

Всегда указывай **тег версии** (`#v1.0.0`), а не ветку — иначе сборка возьмёт последний коммит `main`.

`@nestjs/common`, `@nestjs/microservices` и `rxjs` — **peerDependencies**: пакет использует копии приложения. Иначе `instanceof HttpException` перестанет работать и вместо 404/403 будет 500.

## Как выпустить новую версию

```bash
# правка в src/
npm run build                     # проверить сборку
git add . && git commit -m "feat: ..."
npm version minor                 # 1.0.0 → 1.1.0, коммит + тег v1.1.0
git push --follow-tags
```

Затем в каждом сервисе, которому нужно изменение:

```bash
npm install github:kolya-zalev/crm-shared#v1.1.0
```

### Правила версий (semver)

| Изменение | Версия |
|---|---|
| исправление без изменения контракта | `patch` |
| **новое** сообщение или **необязательное** поле | `minor` |
| изменение или удаление существующего | `major` — лучше новое сообщение (`*.v2`) |

**Порядок обновления:** сначала сервис, который **принимает** сообщение, потом тот, кто **отправляет**.

### Локальная проверка без тега

```bash
npm run build && npm pack                          # crm-shared-x.y.z.tgz
cd ../crm-users-service && npm install ../crm-shared/crm-shared-x.y.z.tgz
```

Перед коммитом сервиса верни `github:...#vX.Y.Z`. Не используй `npm link` / `file:` — получится вторая копия `@nestjs/common`.
