<script lang="ts">
  export let type: 'button' | 'submit' | 'reset' = 'button';
  export let disabled: boolean = false;
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';

  // ✅ Override khusus warna saja
  export let bgColor: string = '';
  export let textColor: string = '';
</script>

<button
  type={type}
  disabled={disabled}
  class={`
    px-4 py-2 rounded-xl text-sm font-medium transition w-full
    ${bgColor || (variant === 'primary' ? 'bg-indigo-600' : variant === 'secondary' ? 'bg-white' : 'bg-red-500')}
    ${textColor || (variant === 'secondary' ? 'text-gray-800' : 'text-white')}
    ${!bgColor && variant === 'primary' && 'hover:bg-indigo-700'}
    ${!bgColor && variant === 'secondary' && 'hover:bg-gray-300' && 'border'}
    ${!bgColor && variant === 'danger' && 'hover:bg-red-600'}
    ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
  `}
>
  <slot />
</button>
