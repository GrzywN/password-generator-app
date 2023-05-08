# Style Guide (CSS)

## Naming Conventions

- Use PascalCase for component names (Block in BEM methodology).
- Use lowercase for component elements and modifiers (Elements and Modifiers in BEM methodology).
- Use camelCase for animation names.
- Use kebab-case for file and directory names unless it is a component file name.

## Other styling conventions

- Use BEM methodology.
- Group all properties that use custom CSS properties on top of selector styles.
- Group CSS properties based on what they do and what they are responsible for.
- Use abstracted CSS properties, don't depend on strict ones. For example, use `--color-danger-400` over `--color-red`.
- Be consistent.

### Example of class names

| Class               | Description                   |
| ------------------- | ----------------------------- |
| `.Button`           | Base class for all buttons.   |
| `.Button--primary`  | Primary button class.         |
| `.Button__icon`     | Icon class for buttons.       |
| `.Checkbox`         | Base class for checkboxes.    |
| `.Checkbox:checked` | Class for checked checkboxes. |

## Colors

| Name                     | Value                       |
| ------------------------ | --------------------------- |
| `--color-neon-green`     | #a4ffaf                     |
| `--color-almost-white`   | #e6e5ea                     |
| `--color-gray`           | #817d92                     |
| `--color-dark-gray`      | #24232c                     |
| `--color-very-dark-gray` | #18171f                     |
| `--color-yellow`         | #f8cd65                     |
| `--color-orange`         | #fb7c58                     |
| `--color-red`            | #f64a4a                     |
| `--color-white`          | #ffffff                     |
| `--color-primary-400`    | var(--color-neon-green)     |
| `--color-neutral-50`     | var(--color-almost-white)   |
| `--color-neutral-300`    | var(--color-gray)           |
| `--color-neutral-500`    | var(--color-dark-gray)      |
| `--color-neutral-700`    | var(--color-very-dark-gray) |
| `--color-danger-400`     | var(--color-red)            |
| `--color-warning-300`    | var(--color-yellow)         |
| `--color-warning-500`    | var(--color-orange)         |
| `--color-success-400`    | var(--color-neon-green)     |

## Fonts

| Name               | Value                            |
| ------------------ | -------------------------------- |
| `--font-fira-code` | 'Fira Code'                      |
| `--font-monospace` | var(--font-fira-code), monospace |

## Animations

| Name                                     | Value                               |
| ---------------------------------------- | ----------------------------------- |
| `--animation-timing-function`            | cubic-bezier(0.215, 0.61, 0.355, 1) |
| `--animation-copy-to-clipboard-duration` | 4s                                  |

## Content

| Name                        | Value             |
| --------------------------- | ----------------- |
| `--content-on-copy-success` | 'Copied'          |
| `--content-on-copy-failure` | 'Copying failed!' |
