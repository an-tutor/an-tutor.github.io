
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function validate_store(store, name) {
        if (store != null && typeof store.subscribe !== 'function') {
            throw new Error(`'${name}' is not a store with a 'subscribe' method`);
        }
    }
    function subscribe(store, ...callbacks) {
        if (store == null) {
            return noop;
        }
        const unsub = store.subscribe(...callbacks);
        return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
    }
    function component_subscribe(component, store, callback) {
        component.$$.on_destroy.push(subscribe(store, callback));
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function get_all_dirty_from_scope($$scope) {
        if ($$scope.ctx.length > 32) {
            const dirty = [];
            const length = $$scope.ctx.length / 32;
            for (let i = 0; i < length; i++) {
                dirty[i] = -1;
            }
            return dirty;
        }
        return -1;
    }
    function exclude_internal_props(props) {
        const result = {};
        for (const k in props)
            if (k[0] !== '$')
                result[k] = props[k];
        return result;
    }
    function action_destroyer(action_result) {
        return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function svg_element(name) {
        return document.createElementNS('http://www.w3.org/2000/svg', name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function set_attributes(node, attributes) {
        // @ts-ignore
        const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
        for (const key in attributes) {
            if (attributes[key] == null) {
                node.removeAttribute(key);
            }
            else if (key === 'style') {
                node.style.cssText = attributes[key];
            }
            else if (key === '__value') {
                node.value = node[key] = attributes[key];
            }
            else if (descriptors[key] && descriptors[key].set) {
                node[key] = attributes[key];
            }
            else {
                attr(node, key, attributes[key]);
            }
        }
    }
    function set_svg_attributes(node, attributes) {
        for (const key in attributes) {
            attr(node, key, attributes[key]);
        }
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_style(node, key, value, important) {
        if (value === null) {
            node.style.removeProperty(key);
        }
        else {
            node.style.setProperty(key, value, important ? 'important' : '');
        }
    }
    function toggle_class(element, name, toggle) {
        element.classList[toggle ? 'add' : 'remove'](name);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }
    class HtmlTag {
        constructor(is_svg = false) {
            this.is_svg = false;
            this.is_svg = is_svg;
            this.e = this.n = null;
        }
        c(html) {
            this.h(html);
        }
        m(html, target, anchor = null) {
            if (!this.e) {
                if (this.is_svg)
                    this.e = svg_element(target.nodeName);
                else
                    this.e = element(target.nodeName);
                this.t = target;
                this.c(html);
            }
            this.i(anchor);
        }
        h(html) {
            this.e.innerHTML = html;
            this.n = Array.from(this.e.childNodes);
        }
        i(anchor) {
            for (let i = 0; i < this.n.length; i += 1) {
                insert(this.t, this.n[i], anchor);
            }
        }
        p(html) {
            this.d();
            this.h(html);
            this.i(this.a);
        }
        d() {
            this.n.forEach(detach);
        }
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    /**
     * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
     * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
     * it can be called from an external module).
     *
     * `onMount` does not run inside a [server-side component](/docs#run-time-server-side-component-api).
     *
     * https://svelte.dev/docs#run-time-svelte-onmount
     */
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }
    /**
     * Schedules a callback to run immediately before the component is unmounted.
     *
     * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
     * only one that runs inside a server-side component.
     *
     * https://svelte.dev/docs#run-time-svelte-ondestroy
     */
    function onDestroy(fn) {
        get_current_component().$$.on_destroy.push(fn);
    }
    /**
     * Creates an event dispatcher that can be used to dispatch [component events](/docs#template-syntax-component-directives-on-eventname).
     * Event dispatchers are functions that can take two arguments: `name` and `detail`.
     *
     * Component events created with `createEventDispatcher` create a
     * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
     * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
     * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
     * property and can contain any type of data.
     *
     * https://svelte.dev/docs#run-time-svelte-createeventdispatcher
     */
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail, { cancelable = false } = {}) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail, { cancelable });
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
                return !event.defaultPrevented;
            }
            return true;
        };
    }
    /**
     * Associates an arbitrary `context` object with the current component and the specified `key`
     * and returns that object. The context is then available to children of the component
     * (including slotted content) with `getContext`.
     *
     * Like lifecycle functions, this must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-setcontext
     */
    function setContext(key, context) {
        get_current_component().$$.context.set(key, context);
        return context;
    }
    /**
     * Retrieves the context that belongs to the closest parent component with the specified `key`.
     * Must be called during component initialisation.
     *
     * https://svelte.dev/docs#run-time-svelte-getcontext
     */
    function getContext(key) {
        return get_current_component().$$.context.get(key);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }

    const globals = (typeof window !== 'undefined'
        ? window
        : typeof globalThis !== 'undefined'
            ? globalThis
            : global);

    function get_spread_update(levels, updates) {
        const update = {};
        const to_null_out = {};
        const accounted_for = { $$scope: 1 };
        let i = levels.length;
        while (i--) {
            const o = levels[i];
            const n = updates[i];
            if (n) {
                for (const key in o) {
                    if (!(key in n))
                        to_null_out[key] = 1;
                }
                for (const key in n) {
                    if (!accounted_for[key]) {
                        update[key] = n[key];
                        accounted_for[key] = 1;
                    }
                }
                levels[i] = n;
            }
            else {
                for (const key in o) {
                    accounted_for[key] = 1;
                }
            }
        }
        for (const key in to_null_out) {
            if (!(key in update))
                update[key] = undefined;
        }
        return update;
    }
    function get_spread_object(spread_props) {
        return typeof spread_props === 'object' && spread_props !== null ? spread_props : {};
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.55.1' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    const data = {
        about: {
            description: '<p>Привет, меня зовут Анастасия.</p><p>Я — репетитор по географии. Помогаю ребятам сдать ОГЭ на высокий балл, а также повысить успеваемость по предмету.</p><p>Докажу, что география — это просто!</p>',
            pros: [
                'Географ с экологическими компетенциями.',
                'Преподаю более 4 лет.',
                'Постоянно повышаю компетенции, чтобы учить вас лучше.',
                'Привожу к желаемым результатам с интересом и без зубрежки.',
                'Помогу увидеть связь географии с другими науками.',
            ],
            process: '<p>Занятия проходят онлайн в течении 60 минут на платформе Edvibe и/или Miro. Все материалы предоставляю. Видеосвязь осуществляется через саму платформу или другие мессенджеры (Zoom, Skype).</p><p>На занятии царит дружелюбная и безопасная атмосфера, которая вовлекает в процесс.</p><p>К каждому ученику подхожу индивидуально, мы вместе ставим цели и достигаем их.</p><p>‌* Работаю на договорной основе.</p>',
        },
        classes: [
            {
                title: 'Индивидуальные занятия',
                btn: {
                    text: 'Записаться на урок',
                    href: 'https://t.me/a_miasina'
                },
                points: [
                    {
                        id: 'p-1',
                        title: 'Стоимость',
                        content: [
                            '<p>Индивидуальное занятие «Подготовка к ОГЭ» (60 минут) / 1000 рублей.</p><p>* При единовременной оплате сертификата на 4 занятия, стоимость 1 урока составит 950 рублей. Срок действия сертификата составляет 30 дней. Общая стоимость сертификата составит 3 800 рублей.</p><p>* При единовременной оплате сертификата на 8 занятий, стоимость 1 урока составит 900 рублей. Срок действия сертификата составляет 30 дней. Общая стоимость сертификата составит 7 200 рублей.</p>'
                        ]
                    },
                    {
                        id: 'p-2',
                        title: 'Пробное занятие',
                        content: [
                            '<p>Занятие проходят онлайн в течении 30 минут.</p><p>На занятии проходит диагностика уровня знаний, по результатам которой, составляется план обучения.</p><p>Стоимость пробного занятия составляет 500 рублей / 30 минут.</p>'
                        ]
                    }
                ]
            },
            {
                title: 'Парные / групповые занятия',
                btn: {
                    text: 'Подробнее о групповых занятиях',
                    href: 'https://t.me/a_miasina'
                },
                points: [
                    {
                        id: 'p-3',
                        title: 'Кому подходит этот формат?',
                        content: [
                            '<p>Парные/групповые занятия подходят тем, кто не хочет сдаться на пути к цели, получить поддержку и вдохновение от людей, понимающих вас; тем, кто хочет больше образовательных коллективных игр и квестов на уроках; тем, кто хочет завести новые знакомства.</p>'
                        ]
                    },
                    {
                        id: 'p-4',
                        title: 'Форматы',
                        content: [
                            '<p>Занятия могут проходит в парах и мини-группах.</p>'
                        ]
                    },
                    {
                        id: 'p-5',
                        title: 'Стоимость',
                        content: [
                            '<p>Групповые занятие «Подготовка к ОГЭ» (60 минут) оплачиваются сертификатами.</p><p>Стоимость сертификата на 4 занятия составляет 3500 рублей.</p><p>Стоимость сертификата на 8 занятий составляет 6500 рублей.</p>'
                        ]
                    },
                    {
                        id: 'p-6',
                        title: 'Что вы получите?',
                        content: [
                            [
                                'Видеозапись уроков.',
                                'Дополнительные материалы, чек-листы.',
                                'Общий чат с ребятами.',
                                'Выгодную стоимость занятий.'
                            ]
                        ]
                    },
                ]
            }
        ]
    };

    const matchIconName = /^[a-z0-9]+(-[a-z0-9]+)*$/;
    const stringToIcon = (value, validate, allowSimpleName, provider = "") => {
      const colonSeparated = value.split(":");
      if (value.slice(0, 1) === "@") {
        if (colonSeparated.length < 2 || colonSeparated.length > 3) {
          return null;
        }
        provider = colonSeparated.shift().slice(1);
      }
      if (colonSeparated.length > 3 || !colonSeparated.length) {
        return null;
      }
      if (colonSeparated.length > 1) {
        const name2 = colonSeparated.pop();
        const prefix = colonSeparated.pop();
        const result = {
          provider: colonSeparated.length > 0 ? colonSeparated[0] : provider,
          prefix,
          name: name2
        };
        return validate && !validateIconName(result) ? null : result;
      }
      const name = colonSeparated[0];
      const dashSeparated = name.split("-");
      if (dashSeparated.length > 1) {
        const result = {
          provider,
          prefix: dashSeparated.shift(),
          name: dashSeparated.join("-")
        };
        return validate && !validateIconName(result) ? null : result;
      }
      if (allowSimpleName && provider === "") {
        const result = {
          provider,
          prefix: "",
          name
        };
        return validate && !validateIconName(result, allowSimpleName) ? null : result;
      }
      return null;
    };
    const validateIconName = (icon, allowSimpleName) => {
      if (!icon) {
        return false;
      }
      return !!((icon.provider === "" || icon.provider.match(matchIconName)) && (allowSimpleName && icon.prefix === "" || icon.prefix.match(matchIconName)) && icon.name.match(matchIconName));
    };

    const defaultIconDimensions = Object.freeze(
      {
        left: 0,
        top: 0,
        width: 16,
        height: 16
      }
    );
    const defaultIconTransformations = Object.freeze({
      rotate: 0,
      vFlip: false,
      hFlip: false
    });
    const defaultIconProps = Object.freeze({
      ...defaultIconDimensions,
      ...defaultIconTransformations
    });
    const defaultExtendedIconProps = Object.freeze({
      ...defaultIconProps,
      body: "",
      hidden: false
    });

    function mergeIconTransformations(obj1, obj2) {
      const result = {};
      if (!obj1.hFlip !== !obj2.hFlip) {
        result.hFlip = true;
      }
      if (!obj1.vFlip !== !obj2.vFlip) {
        result.vFlip = true;
      }
      const rotate = ((obj1.rotate || 0) + (obj2.rotate || 0)) % 4;
      if (rotate) {
        result.rotate = rotate;
      }
      return result;
    }

    function mergeIconData(parent, child) {
      const result = mergeIconTransformations(parent, child);
      for (const key in defaultExtendedIconProps) {
        if (key in defaultIconTransformations) {
          if (key in parent && !(key in result)) {
            result[key] = defaultIconTransformations[key];
          }
        } else if (key in child) {
          result[key] = child[key];
        } else if (key in parent) {
          result[key] = parent[key];
        }
      }
      return result;
    }

    function getIconsTree(data, names) {
      const icons = data.icons;
      const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
      const resolved = /* @__PURE__ */ Object.create(null);
      function resolve(name) {
        if (icons[name]) {
          return resolved[name] = [];
        }
        if (!(name in resolved)) {
          resolved[name] = null;
          const parent = aliases[name] && aliases[name].parent;
          const value = parent && resolve(parent);
          if (value) {
            resolved[name] = [parent].concat(value);
          }
        }
        return resolved[name];
      }
      (names || Object.keys(icons).concat(Object.keys(aliases))).forEach(resolve);
      return resolved;
    }

    function internalGetIconData(data, name, tree) {
      const icons = data.icons;
      const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
      let currentProps = {};
      function parse(name2) {
        currentProps = mergeIconData(
          icons[name2] || aliases[name2],
          currentProps
        );
      }
      parse(name);
      tree.forEach(parse);
      return mergeIconData(data, currentProps);
    }

    function parseIconSet(data, callback) {
      const names = [];
      if (typeof data !== "object" || typeof data.icons !== "object") {
        return names;
      }
      if (data.not_found instanceof Array) {
        data.not_found.forEach((name) => {
          callback(name, null);
          names.push(name);
        });
      }
      const tree = getIconsTree(data);
      for (const name in tree) {
        const item = tree[name];
        if (item) {
          callback(name, internalGetIconData(data, name, item));
          names.push(name);
        }
      }
      return names;
    }

    const optionalPropertyDefaults = {
      provider: "",
      aliases: {},
      not_found: {},
      ...defaultIconDimensions
    };
    function checkOptionalProps(item, defaults) {
      for (const prop in defaults) {
        if (prop in item && typeof item[prop] !== typeof defaults[prop]) {
          return false;
        }
      }
      return true;
    }
    function quicklyValidateIconSet(obj) {
      if (typeof obj !== "object" || obj === null) {
        return null;
      }
      const data = obj;
      if (typeof data.prefix !== "string" || !obj.icons || typeof obj.icons !== "object") {
        return null;
      }
      if (!checkOptionalProps(obj, optionalPropertyDefaults)) {
        return null;
      }
      const icons = data.icons;
      for (const name in icons) {
        const icon = icons[name];
        if (!name.match(matchIconName) || typeof icon.body !== "string" || !checkOptionalProps(
          icon,
          defaultExtendedIconProps
        )) {
          return null;
        }
      }
      const aliases = data.aliases || /* @__PURE__ */ Object.create(null);
      for (const name in aliases) {
        const icon = aliases[name];
        const parent = icon.parent;
        if (!name.match(matchIconName) || typeof parent !== "string" || !icons[parent] && !aliases[parent] || !checkOptionalProps(
          icon,
          defaultExtendedIconProps
        )) {
          return null;
        }
      }
      return data;
    }

    const dataStorage = /* @__PURE__ */ Object.create(null);
    function newStorage(provider, prefix) {
      return {
        provider,
        prefix,
        icons: /* @__PURE__ */ Object.create(null),
        missing: /* @__PURE__ */ new Set()
      };
    }
    function getStorage(provider, prefix) {
      const providerStorage = dataStorage[provider] || (dataStorage[provider] = /* @__PURE__ */ Object.create(null));
      return providerStorage[prefix] || (providerStorage[prefix] = newStorage(provider, prefix));
    }
    function addIconSet(storage, data) {
      if (!quicklyValidateIconSet(data)) {
        return [];
      }
      return parseIconSet(data, (name, icon) => {
        if (icon) {
          storage.icons[name] = icon;
        } else {
          storage.missing.add(name);
        }
      });
    }
    function addIconToStorage(storage, name, icon) {
      try {
        if (typeof icon.body === "string") {
          storage.icons[name] = { ...icon };
          return true;
        }
      } catch (err) {
      }
      return false;
    }
    function listIcons(provider, prefix) {
      let allIcons = [];
      const providers = typeof provider === "string" ? [provider] : Object.keys(dataStorage);
      providers.forEach((provider2) => {
        const prefixes = typeof provider2 === "string" && typeof prefix === "string" ? [prefix] : Object.keys(dataStorage[provider2] || {});
        prefixes.forEach((prefix2) => {
          const storage = getStorage(provider2, prefix2);
          allIcons = allIcons.concat(
            Object.keys(storage.icons).map(
              (name) => (provider2 !== "" ? "@" + provider2 + ":" : "") + prefix2 + ":" + name
            )
          );
        });
      });
      return allIcons;
    }

    let simpleNames = false;
    function allowSimpleNames(allow) {
      if (typeof allow === "boolean") {
        simpleNames = allow;
      }
      return simpleNames;
    }
    function getIconData(name) {
      const icon = typeof name === "string" ? stringToIcon(name, true, simpleNames) : name;
      if (icon) {
        const storage = getStorage(icon.provider, icon.prefix);
        const iconName = icon.name;
        return storage.icons[iconName] || (storage.missing.has(iconName) ? null : void 0);
      }
    }
    function addIcon(name, data) {
      const icon = stringToIcon(name, true, simpleNames);
      if (!icon) {
        return false;
      }
      const storage = getStorage(icon.provider, icon.prefix);
      return addIconToStorage(storage, icon.name, data);
    }
    function addCollection(data, provider) {
      if (typeof data !== "object") {
        return false;
      }
      if (typeof provider !== "string") {
        provider = data.provider || "";
      }
      if (simpleNames && !provider && !data.prefix) {
        let added = false;
        if (quicklyValidateIconSet(data)) {
          data.prefix = "";
          parseIconSet(data, (name, icon) => {
            if (icon && addIcon(name, icon)) {
              added = true;
            }
          });
        }
        return added;
      }
      const prefix = data.prefix;
      if (!validateIconName({
        provider,
        prefix,
        name: "a"
      })) {
        return false;
      }
      const storage = getStorage(provider, prefix);
      return !!addIconSet(storage, data);
    }
    function iconExists(name) {
      return !!getIconData(name);
    }
    function getIcon(name) {
      const result = getIconData(name);
      return result ? {
        ...defaultIconProps,
        ...result
      } : null;
    }

    const defaultIconSizeCustomisations = Object.freeze({
      width: null,
      height: null
    });
    const defaultIconCustomisations = Object.freeze({
      ...defaultIconSizeCustomisations,
      ...defaultIconTransformations
    });

    const unitsSplit = /(-?[0-9.]*[0-9]+[0-9.]*)/g;
    const unitsTest = /^-?[0-9.]*[0-9]+[0-9.]*$/g;
    function calculateSize(size, ratio, precision) {
      if (ratio === 1) {
        return size;
      }
      precision = precision || 100;
      if (typeof size === "number") {
        return Math.ceil(size * ratio * precision) / precision;
      }
      if (typeof size !== "string") {
        return size;
      }
      const oldParts = size.split(unitsSplit);
      if (oldParts === null || !oldParts.length) {
        return size;
      }
      const newParts = [];
      let code = oldParts.shift();
      let isNumber = unitsTest.test(code);
      while (true) {
        if (isNumber) {
          const num = parseFloat(code);
          if (isNaN(num)) {
            newParts.push(code);
          } else {
            newParts.push(Math.ceil(num * ratio * precision) / precision);
          }
        } else {
          newParts.push(code);
        }
        code = oldParts.shift();
        if (code === void 0) {
          return newParts.join("");
        }
        isNumber = !isNumber;
      }
    }

    function iconToSVG(icon, customisations) {
      const fullIcon = {
        ...defaultIconProps,
        ...icon
      };
      const fullCustomisations = {
        ...defaultIconCustomisations,
        ...customisations
      };
      const box = {
        left: fullIcon.left,
        top: fullIcon.top,
        width: fullIcon.width,
        height: fullIcon.height
      };
      let body = fullIcon.body;
      [fullIcon, fullCustomisations].forEach((props) => {
        const transformations = [];
        const hFlip = props.hFlip;
        const vFlip = props.vFlip;
        let rotation = props.rotate;
        if (hFlip) {
          if (vFlip) {
            rotation += 2;
          } else {
            transformations.push(
              "translate(" + (box.width + box.left).toString() + " " + (0 - box.top).toString() + ")"
            );
            transformations.push("scale(-1 1)");
            box.top = box.left = 0;
          }
        } else if (vFlip) {
          transformations.push(
            "translate(" + (0 - box.left).toString() + " " + (box.height + box.top).toString() + ")"
          );
          transformations.push("scale(1 -1)");
          box.top = box.left = 0;
        }
        let tempValue;
        if (rotation < 0) {
          rotation -= Math.floor(rotation / 4) * 4;
        }
        rotation = rotation % 4;
        switch (rotation) {
          case 1:
            tempValue = box.height / 2 + box.top;
            transformations.unshift(
              "rotate(90 " + tempValue.toString() + " " + tempValue.toString() + ")"
            );
            break;
          case 2:
            transformations.unshift(
              "rotate(180 " + (box.width / 2 + box.left).toString() + " " + (box.height / 2 + box.top).toString() + ")"
            );
            break;
          case 3:
            tempValue = box.width / 2 + box.left;
            transformations.unshift(
              "rotate(-90 " + tempValue.toString() + " " + tempValue.toString() + ")"
            );
            break;
        }
        if (rotation % 2 === 1) {
          if (box.left !== box.top) {
            tempValue = box.left;
            box.left = box.top;
            box.top = tempValue;
          }
          if (box.width !== box.height) {
            tempValue = box.width;
            box.width = box.height;
            box.height = tempValue;
          }
        }
        if (transformations.length) {
          body = '<g transform="' + transformations.join(" ") + '">' + body + "</g>";
        }
      });
      const customisationsWidth = fullCustomisations.width;
      const customisationsHeight = fullCustomisations.height;
      const boxWidth = box.width;
      const boxHeight = box.height;
      let width;
      let height;
      if (customisationsWidth === null) {
        height = customisationsHeight === null ? "1em" : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
        width = calculateSize(height, boxWidth / boxHeight);
      } else {
        width = customisationsWidth === "auto" ? boxWidth : customisationsWidth;
        height = customisationsHeight === null ? calculateSize(width, boxHeight / boxWidth) : customisationsHeight === "auto" ? boxHeight : customisationsHeight;
      }
      const result = {
        attributes: {
          width: width.toString(),
          height: height.toString(),
          viewBox: box.left.toString() + " " + box.top.toString() + " " + boxWidth.toString() + " " + boxHeight.toString()
        },
        body
      };
      return result;
    }

    const regex = /\sid="(\S+)"/g;
    const randomPrefix = "IconifyId" + Date.now().toString(16) + (Math.random() * 16777216 | 0).toString(16);
    let counter = 0;
    function replaceIDs(body, prefix = randomPrefix) {
      const ids = [];
      let match;
      while (match = regex.exec(body)) {
        ids.push(match[1]);
      }
      if (!ids.length) {
        return body;
      }
      ids.forEach((id) => {
        const newID = typeof prefix === "function" ? prefix(id) : prefix + (counter++).toString();
        const escapedID = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        body = body.replace(
          new RegExp('([#;"])(' + escapedID + ')([")]|\\.[a-z])', "g"),
          "$1" + newID + "$3"
        );
      });
      return body;
    }

    const storage = /* @__PURE__ */ Object.create(null);
    function setAPIModule(provider, item) {
      storage[provider] = item;
    }
    function getAPIModule(provider) {
      return storage[provider] || storage[""];
    }

    function createAPIConfig(source) {
      let resources;
      if (typeof source.resources === "string") {
        resources = [source.resources];
      } else {
        resources = source.resources;
        if (!(resources instanceof Array) || !resources.length) {
          return null;
        }
      }
      const result = {
        resources,
        path: source.path || "/",
        maxURL: source.maxURL || 500,
        rotate: source.rotate || 750,
        timeout: source.timeout || 5e3,
        random: source.random === true,
        index: source.index || 0,
        dataAfterTimeout: source.dataAfterTimeout !== false
      };
      return result;
    }
    const configStorage = /* @__PURE__ */ Object.create(null);
    const fallBackAPISources = [
      "https://api.simplesvg.com",
      "https://api.unisvg.com"
    ];
    const fallBackAPI = [];
    while (fallBackAPISources.length > 0) {
      if (fallBackAPISources.length === 1) {
        fallBackAPI.push(fallBackAPISources.shift());
      } else {
        if (Math.random() > 0.5) {
          fallBackAPI.push(fallBackAPISources.shift());
        } else {
          fallBackAPI.push(fallBackAPISources.pop());
        }
      }
    }
    configStorage[""] = createAPIConfig({
      resources: ["https://api.iconify.design"].concat(fallBackAPI)
    });
    function addAPIProvider(provider, customConfig) {
      const config = createAPIConfig(customConfig);
      if (config === null) {
        return false;
      }
      configStorage[provider] = config;
      return true;
    }
    function getAPIConfig(provider) {
      return configStorage[provider];
    }
    function listAPIProviders() {
      return Object.keys(configStorage);
    }

    const detectFetch = () => {
      let callback;
      try {
        callback = fetch;
        if (typeof callback === "function") {
          return callback;
        }
      } catch (err) {
      }
    };
    let fetchModule = detectFetch();
    function setFetch(fetch2) {
      fetchModule = fetch2;
    }
    function getFetch() {
      return fetchModule;
    }
    function calculateMaxLength(provider, prefix) {
      const config = getAPIConfig(provider);
      if (!config) {
        return 0;
      }
      let result;
      if (!config.maxURL) {
        result = 0;
      } else {
        let maxHostLength = 0;
        config.resources.forEach((item) => {
          const host = item;
          maxHostLength = Math.max(maxHostLength, host.length);
        });
        const url = prefix + ".json?icons=";
        result = config.maxURL - maxHostLength - config.path.length - url.length;
      }
      return result;
    }
    function shouldAbort(status) {
      return status === 404;
    }
    const prepare = (provider, prefix, icons) => {
      const results = [];
      const maxLength = calculateMaxLength(provider, prefix);
      const type = "icons";
      let item = {
        type,
        provider,
        prefix,
        icons: []
      };
      let length = 0;
      icons.forEach((name, index) => {
        length += name.length + 1;
        if (length >= maxLength && index > 0) {
          results.push(item);
          item = {
            type,
            provider,
            prefix,
            icons: []
          };
          length = name.length;
        }
        item.icons.push(name);
      });
      results.push(item);
      return results;
    };
    function getPath(provider) {
      if (typeof provider === "string") {
        const config = getAPIConfig(provider);
        if (config) {
          return config.path;
        }
      }
      return "/";
    }
    const send = (host, params, callback) => {
      if (!fetchModule) {
        callback("abort", 424);
        return;
      }
      let path = getPath(params.provider);
      switch (params.type) {
        case "icons": {
          const prefix = params.prefix;
          const icons = params.icons;
          const iconsList = icons.join(",");
          const urlParams = new URLSearchParams({
            icons: iconsList
          });
          path += prefix + ".json?" + urlParams.toString();
          break;
        }
        case "custom": {
          const uri = params.uri;
          path += uri.slice(0, 1) === "/" ? uri.slice(1) : uri;
          break;
        }
        default:
          callback("abort", 400);
          return;
      }
      let defaultError = 503;
      fetchModule(host + path).then((response) => {
        const status = response.status;
        if (status !== 200) {
          setTimeout(() => {
            callback(shouldAbort(status) ? "abort" : "next", status);
          });
          return;
        }
        defaultError = 501;
        return response.json();
      }).then((data) => {
        if (typeof data !== "object" || data === null) {
          setTimeout(() => {
            if (data === 404) {
              callback("abort", data);
            } else {
              callback("next", defaultError);
            }
          });
          return;
        }
        setTimeout(() => {
          callback("success", data);
        });
      }).catch(() => {
        callback("next", defaultError);
      });
    };
    const fetchAPIModule = {
      prepare,
      send
    };

    function sortIcons(icons) {
      const result = {
        loaded: [],
        missing: [],
        pending: []
      };
      const storage = /* @__PURE__ */ Object.create(null);
      icons.sort((a, b) => {
        if (a.provider !== b.provider) {
          return a.provider.localeCompare(b.provider);
        }
        if (a.prefix !== b.prefix) {
          return a.prefix.localeCompare(b.prefix);
        }
        return a.name.localeCompare(b.name);
      });
      let lastIcon = {
        provider: "",
        prefix: "",
        name: ""
      };
      icons.forEach((icon) => {
        if (lastIcon.name === icon.name && lastIcon.prefix === icon.prefix && lastIcon.provider === icon.provider) {
          return;
        }
        lastIcon = icon;
        const provider = icon.provider;
        const prefix = icon.prefix;
        const name = icon.name;
        const providerStorage = storage[provider] || (storage[provider] = /* @__PURE__ */ Object.create(null));
        const localStorage = providerStorage[prefix] || (providerStorage[prefix] = getStorage(provider, prefix));
        let list;
        if (name in localStorage.icons) {
          list = result.loaded;
        } else if (prefix === "" || localStorage.missing.has(name)) {
          list = result.missing;
        } else {
          list = result.pending;
        }
        const item = {
          provider,
          prefix,
          name
        };
        list.push(item);
      });
      return result;
    }

    function removeCallback(storages, id) {
      storages.forEach((storage) => {
        const items = storage.loaderCallbacks;
        if (items) {
          storage.loaderCallbacks = items.filter((row) => row.id !== id);
        }
      });
    }
    function updateCallbacks(storage) {
      if (!storage.pendingCallbacksFlag) {
        storage.pendingCallbacksFlag = true;
        setTimeout(() => {
          storage.pendingCallbacksFlag = false;
          const items = storage.loaderCallbacks ? storage.loaderCallbacks.slice(0) : [];
          if (!items.length) {
            return;
          }
          let hasPending = false;
          const provider = storage.provider;
          const prefix = storage.prefix;
          items.forEach((item) => {
            const icons = item.icons;
            const oldLength = icons.pending.length;
            icons.pending = icons.pending.filter((icon) => {
              if (icon.prefix !== prefix) {
                return true;
              }
              const name = icon.name;
              if (storage.icons[name]) {
                icons.loaded.push({
                  provider,
                  prefix,
                  name
                });
              } else if (storage.missing.has(name)) {
                icons.missing.push({
                  provider,
                  prefix,
                  name
                });
              } else {
                hasPending = true;
                return true;
              }
              return false;
            });
            if (icons.pending.length !== oldLength) {
              if (!hasPending) {
                removeCallback([storage], item.id);
              }
              item.callback(
                icons.loaded.slice(0),
                icons.missing.slice(0),
                icons.pending.slice(0),
                item.abort
              );
            }
          });
        });
      }
    }
    let idCounter = 0;
    function storeCallback(callback, icons, pendingSources) {
      const id = idCounter++;
      const abort = removeCallback.bind(null, pendingSources, id);
      if (!icons.pending.length) {
        return abort;
      }
      const item = {
        id,
        icons,
        callback,
        abort
      };
      pendingSources.forEach((storage) => {
        (storage.loaderCallbacks || (storage.loaderCallbacks = [])).push(item);
      });
      return abort;
    }

    function listToIcons(list, validate = true, simpleNames = false) {
      const result = [];
      list.forEach((item) => {
        const icon = typeof item === "string" ? stringToIcon(item, validate, simpleNames) : item;
        if (icon) {
          result.push(icon);
        }
      });
      return result;
    }

    // src/config.ts
    var defaultConfig = {
      resources: [],
      index: 0,
      timeout: 2e3,
      rotate: 750,
      random: false,
      dataAfterTimeout: false
    };

    // src/query.ts
    function sendQuery(config, payload, query, done) {
      const resourcesCount = config.resources.length;
      const startIndex = config.random ? Math.floor(Math.random() * resourcesCount) : config.index;
      let resources;
      if (config.random) {
        let list = config.resources.slice(0);
        resources = [];
        while (list.length > 1) {
          const nextIndex = Math.floor(Math.random() * list.length);
          resources.push(list[nextIndex]);
          list = list.slice(0, nextIndex).concat(list.slice(nextIndex + 1));
        }
        resources = resources.concat(list);
      } else {
        resources = config.resources.slice(startIndex).concat(config.resources.slice(0, startIndex));
      }
      const startTime = Date.now();
      let status = "pending";
      let queriesSent = 0;
      let lastError;
      let timer = null;
      let queue = [];
      let doneCallbacks = [];
      if (typeof done === "function") {
        doneCallbacks.push(done);
      }
      function resetTimer() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
      }
      function abort() {
        if (status === "pending") {
          status = "aborted";
        }
        resetTimer();
        queue.forEach((item) => {
          if (item.status === "pending") {
            item.status = "aborted";
          }
        });
        queue = [];
      }
      function subscribe(callback, overwrite) {
        if (overwrite) {
          doneCallbacks = [];
        }
        if (typeof callback === "function") {
          doneCallbacks.push(callback);
        }
      }
      function getQueryStatus() {
        return {
          startTime,
          payload,
          status,
          queriesSent,
          queriesPending: queue.length,
          subscribe,
          abort
        };
      }
      function failQuery() {
        status = "failed";
        doneCallbacks.forEach((callback) => {
          callback(void 0, lastError);
        });
      }
      function clearQueue() {
        queue.forEach((item) => {
          if (item.status === "pending") {
            item.status = "aborted";
          }
        });
        queue = [];
      }
      function moduleResponse(item, response, data) {
        const isError = response !== "success";
        queue = queue.filter((queued) => queued !== item);
        switch (status) {
          case "pending":
            break;
          case "failed":
            if (isError || !config.dataAfterTimeout) {
              return;
            }
            break;
          default:
            return;
        }
        if (response === "abort") {
          lastError = data;
          failQuery();
          return;
        }
        if (isError) {
          lastError = data;
          if (!queue.length) {
            if (!resources.length) {
              failQuery();
            } else {
              execNext();
            }
          }
          return;
        }
        resetTimer();
        clearQueue();
        if (!config.random) {
          const index = config.resources.indexOf(item.resource);
          if (index !== -1 && index !== config.index) {
            config.index = index;
          }
        }
        status = "completed";
        doneCallbacks.forEach((callback) => {
          callback(data);
        });
      }
      function execNext() {
        if (status !== "pending") {
          return;
        }
        resetTimer();
        const resource = resources.shift();
        if (resource === void 0) {
          if (queue.length) {
            timer = setTimeout(() => {
              resetTimer();
              if (status === "pending") {
                clearQueue();
                failQuery();
              }
            }, config.timeout);
            return;
          }
          failQuery();
          return;
        }
        const item = {
          status: "pending",
          resource,
          callback: (status2, data) => {
            moduleResponse(item, status2, data);
          }
        };
        queue.push(item);
        queriesSent++;
        timer = setTimeout(execNext, config.rotate);
        query(resource, payload, item.callback);
      }
      setTimeout(execNext);
      return getQueryStatus;
    }

    // src/index.ts
    function initRedundancy(cfg) {
      const config = {
        ...defaultConfig,
        ...cfg
      };
      let queries = [];
      function cleanup() {
        queries = queries.filter((item) => item().status === "pending");
      }
      function query(payload, queryCallback, doneCallback) {
        const query2 = sendQuery(
          config,
          payload,
          queryCallback,
          (data, error) => {
            cleanup();
            if (doneCallback) {
              doneCallback(data, error);
            }
          }
        );
        queries.push(query2);
        return query2;
      }
      function find(callback) {
        return queries.find((value) => {
          return callback(value);
        }) || null;
      }
      const instance = {
        query,
        find,
        setIndex: (index) => {
          config.index = index;
        },
        getIndex: () => config.index,
        cleanup
      };
      return instance;
    }

    function emptyCallback$1() {
    }
    const redundancyCache = /* @__PURE__ */ Object.create(null);
    function getRedundancyCache(provider) {
      if (!redundancyCache[provider]) {
        const config = getAPIConfig(provider);
        if (!config) {
          return;
        }
        const redundancy = initRedundancy(config);
        const cachedReundancy = {
          config,
          redundancy
        };
        redundancyCache[provider] = cachedReundancy;
      }
      return redundancyCache[provider];
    }
    function sendAPIQuery(target, query, callback) {
      let redundancy;
      let send;
      if (typeof target === "string") {
        const api = getAPIModule(target);
        if (!api) {
          callback(void 0, 424);
          return emptyCallback$1;
        }
        send = api.send;
        const cached = getRedundancyCache(target);
        if (cached) {
          redundancy = cached.redundancy;
        }
      } else {
        const config = createAPIConfig(target);
        if (config) {
          redundancy = initRedundancy(config);
          const moduleKey = target.resources ? target.resources[0] : "";
          const api = getAPIModule(moduleKey);
          if (api) {
            send = api.send;
          }
        }
      }
      if (!redundancy || !send) {
        callback(void 0, 424);
        return emptyCallback$1;
      }
      return redundancy.query(query, send, callback)().abort;
    }

    const browserCacheVersion = "iconify2";
    const browserCachePrefix = "iconify";
    const browserCacheCountKey = browserCachePrefix + "-count";
    const browserCacheVersionKey = browserCachePrefix + "-version";
    const browserStorageHour = 36e5;
    const browserStorageCacheExpiration = 168;

    function getStoredItem(func, key) {
      try {
        return func.getItem(key);
      } catch (err) {
      }
    }
    function setStoredItem(func, key, value) {
      try {
        func.setItem(key, value);
        return true;
      } catch (err) {
      }
    }
    function removeStoredItem(func, key) {
      try {
        func.removeItem(key);
      } catch (err) {
      }
    }

    function setBrowserStorageItemsCount(storage, value) {
      return setStoredItem(storage, browserCacheCountKey, value.toString());
    }
    function getBrowserStorageItemsCount(storage) {
      return parseInt(getStoredItem(storage, browserCacheCountKey)) || 0;
    }

    const browserStorageConfig = {
      local: true,
      session: true
    };
    const browserStorageEmptyItems = {
      local: /* @__PURE__ */ new Set(),
      session: /* @__PURE__ */ new Set()
    };
    let browserStorageStatus = false;
    function setBrowserStorageStatus(status) {
      browserStorageStatus = status;
    }

    let _window = typeof window === "undefined" ? {} : window;
    function getBrowserStorage(key) {
      const attr = key + "Storage";
      try {
        if (_window && _window[attr] && typeof _window[attr].length === "number") {
          return _window[attr];
        }
      } catch (err) {
      }
      browserStorageConfig[key] = false;
    }

    function iterateBrowserStorage(key, callback) {
      const func = getBrowserStorage(key);
      if (!func) {
        return;
      }
      const version = getStoredItem(func, browserCacheVersionKey);
      if (version !== browserCacheVersion) {
        if (version) {
          const total2 = getBrowserStorageItemsCount(func);
          for (let i = 0; i < total2; i++) {
            removeStoredItem(func, browserCachePrefix + i.toString());
          }
        }
        setStoredItem(func, browserCacheVersionKey, browserCacheVersion);
        setBrowserStorageItemsCount(func, 0);
        return;
      }
      const minTime = Math.floor(Date.now() / browserStorageHour) - browserStorageCacheExpiration;
      const parseItem = (index) => {
        const name = browserCachePrefix + index.toString();
        const item = getStoredItem(func, name);
        if (typeof item !== "string") {
          return;
        }
        try {
          const data = JSON.parse(item);
          if (typeof data === "object" && typeof data.cached === "number" && data.cached > minTime && typeof data.provider === "string" && typeof data.data === "object" && typeof data.data.prefix === "string" && callback(data, index)) {
            return true;
          }
        } catch (err) {
        }
        removeStoredItem(func, name);
      };
      let total = getBrowserStorageItemsCount(func);
      for (let i = total - 1; i >= 0; i--) {
        if (!parseItem(i)) {
          if (i === total - 1) {
            total--;
            setBrowserStorageItemsCount(func, total);
          } else {
            browserStorageEmptyItems[key].add(i);
          }
        }
      }
    }

    function initBrowserStorage() {
      if (browserStorageStatus) {
        return;
      }
      setBrowserStorageStatus(true);
      for (const key in browserStorageConfig) {
        iterateBrowserStorage(key, (item) => {
          const iconSet = item.data;
          const provider = item.provider;
          const prefix = iconSet.prefix;
          const storage = getStorage(
            provider,
            prefix
          );
          if (!addIconSet(storage, iconSet).length) {
            return false;
          }
          const lastModified = iconSet.lastModified || -1;
          storage.lastModifiedCached = storage.lastModifiedCached ? Math.min(storage.lastModifiedCached, lastModified) : lastModified;
          return true;
        });
      }
    }

    function updateLastModified(storage, lastModified) {
      const lastValue = storage.lastModifiedCached;
      if (lastValue && lastValue >= lastModified) {
        return lastValue === lastModified;
      }
      storage.lastModifiedCached = lastModified;
      if (lastValue) {
        for (const key in browserStorageConfig) {
          iterateBrowserStorage(key, (item) => {
            const iconSet = item.data;
            return item.provider !== storage.provider || iconSet.prefix !== storage.prefix || iconSet.lastModified === lastModified;
          });
        }
      }
      return true;
    }
    function storeInBrowserStorage(storage, data) {
      if (!browserStorageStatus) {
        initBrowserStorage();
      }
      function store(key) {
        let func;
        if (!browserStorageConfig[key] || !(func = getBrowserStorage(key))) {
          return;
        }
        const set = browserStorageEmptyItems[key];
        let index;
        if (set.size) {
          set.delete(index = Array.from(set).shift());
        } else {
          index = getBrowserStorageItemsCount(func);
          if (!setBrowserStorageItemsCount(func, index + 1)) {
            return;
          }
        }
        const item = {
          cached: Math.floor(Date.now() / browserStorageHour),
          provider: storage.provider,
          data
        };
        return setStoredItem(
          func,
          browserCachePrefix + index.toString(),
          JSON.stringify(item)
        );
      }
      if (data.lastModified && !updateLastModified(storage, data.lastModified)) {
        return;
      }
      if (!Object.keys(data.icons).length) {
        return;
      }
      if (data.not_found) {
        data = Object.assign({}, data);
        delete data.not_found;
      }
      if (!store("local")) {
        store("session");
      }
    }

    function emptyCallback() {
    }
    function loadedNewIcons(storage) {
      if (!storage.iconsLoaderFlag) {
        storage.iconsLoaderFlag = true;
        setTimeout(() => {
          storage.iconsLoaderFlag = false;
          updateCallbacks(storage);
        });
      }
    }
    function loadNewIcons(storage, icons) {
      if (!storage.iconsToLoad) {
        storage.iconsToLoad = icons;
      } else {
        storage.iconsToLoad = storage.iconsToLoad.concat(icons).sort();
      }
      if (!storage.iconsQueueFlag) {
        storage.iconsQueueFlag = true;
        setTimeout(() => {
          storage.iconsQueueFlag = false;
          const { provider, prefix } = storage;
          const icons2 = storage.iconsToLoad;
          delete storage.iconsToLoad;
          let api;
          if (!icons2 || !(api = getAPIModule(provider))) {
            return;
          }
          const params = api.prepare(provider, prefix, icons2);
          params.forEach((item) => {
            sendAPIQuery(provider, item, (data) => {
              if (typeof data !== "object") {
                item.icons.forEach((name) => {
                  storage.missing.add(name);
                });
              } else {
                try {
                  const parsed = addIconSet(
                    storage,
                    data
                  );
                  if (!parsed.length) {
                    return;
                  }
                  const pending = storage.pendingIcons;
                  if (pending) {
                    parsed.forEach((name) => {
                      pending.delete(name);
                    });
                  }
                  storeInBrowserStorage(storage, data);
                } catch (err) {
                  console.error(err);
                }
              }
              loadedNewIcons(storage);
            });
          });
        });
      }
    }
    const loadIcons = (icons, callback) => {
      const cleanedIcons = listToIcons(icons, true, allowSimpleNames());
      const sortedIcons = sortIcons(cleanedIcons);
      if (!sortedIcons.pending.length) {
        let callCallback = true;
        if (callback) {
          setTimeout(() => {
            if (callCallback) {
              callback(
                sortedIcons.loaded,
                sortedIcons.missing,
                sortedIcons.pending,
                emptyCallback
              );
            }
          });
        }
        return () => {
          callCallback = false;
        };
      }
      const newIcons = /* @__PURE__ */ Object.create(null);
      const sources = [];
      let lastProvider, lastPrefix;
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix } = icon;
        if (prefix === lastPrefix && provider === lastProvider) {
          return;
        }
        lastProvider = provider;
        lastPrefix = prefix;
        sources.push(getStorage(provider, prefix));
        const providerNewIcons = newIcons[provider] || (newIcons[provider] = /* @__PURE__ */ Object.create(null));
        if (!providerNewIcons[prefix]) {
          providerNewIcons[prefix] = [];
        }
      });
      sortedIcons.pending.forEach((icon) => {
        const { provider, prefix, name } = icon;
        const storage = getStorage(provider, prefix);
        const pendingQueue = storage.pendingIcons || (storage.pendingIcons = /* @__PURE__ */ new Set());
        if (!pendingQueue.has(name)) {
          pendingQueue.add(name);
          newIcons[provider][prefix].push(name);
        }
      });
      sources.forEach((storage) => {
        const { provider, prefix } = storage;
        if (newIcons[provider][prefix].length) {
          loadNewIcons(storage, newIcons[provider][prefix]);
        }
      });
      return callback ? storeCallback(callback, sortedIcons, sources) : emptyCallback;
    };
    const loadIcon = (icon) => {
      return new Promise((fulfill, reject) => {
        const iconObj = typeof icon === "string" ? stringToIcon(icon, true) : icon;
        if (!iconObj) {
          reject(icon);
          return;
        }
        loadIcons([iconObj || icon], (loaded) => {
          if (loaded.length && iconObj) {
            const data = getIconData(iconObj);
            if (data) {
              fulfill({
                ...defaultIconProps,
                ...data
              });
              return;
            }
          }
          reject(icon);
        });
      });
    };

    function toggleBrowserCache(storage, value) {
      switch (storage) {
        case "local":
        case "session":
          browserStorageConfig[storage] = value;
          break;
        case "all":
          for (const key in browserStorageConfig) {
            browserStorageConfig[key] = value;
          }
          break;
      }
    }

    function mergeCustomisations(defaults, item) {
      const result = {
        ...defaults
      };
      for (const key in item) {
        const value = item[key];
        const valueType = typeof value;
        if (key in defaultIconSizeCustomisations) {
          if (value === null || value && (valueType === "string" || valueType === "number")) {
            result[key] = value;
          }
        } else if (valueType === typeof result[key]) {
          result[key] = key === "rotate" ? value % 4 : value;
        }
      }
      return result;
    }

    const separator = /[\s,]+/;
    function flipFromString(custom, flip) {
      flip.split(separator).forEach((str) => {
        const value = str.trim();
        switch (value) {
          case "horizontal":
            custom.hFlip = true;
            break;
          case "vertical":
            custom.vFlip = true;
            break;
        }
      });
    }

    function rotateFromString(value, defaultValue = 0) {
      const units = value.replace(/^-?[0-9.]*/, "");
      function cleanup(value2) {
        while (value2 < 0) {
          value2 += 4;
        }
        return value2 % 4;
      }
      if (units === "") {
        const num = parseInt(value);
        return isNaN(num) ? 0 : cleanup(num);
      } else if (units !== value) {
        let split = 0;
        switch (units) {
          case "%":
            split = 25;
            break;
          case "deg":
            split = 90;
        }
        if (split) {
          let num = parseFloat(value.slice(0, value.length - units.length));
          if (isNaN(num)) {
            return 0;
          }
          num = num / split;
          return num % 1 === 0 ? cleanup(num) : 0;
        }
      }
      return defaultValue;
    }

    function iconToHTML(body, attributes) {
      let renderAttribsHTML = body.indexOf("xlink:") === -1 ? "" : ' xmlns:xlink="http://www.w3.org/1999/xlink"';
      for (const attr in attributes) {
        renderAttribsHTML += " " + attr + '="' + attributes[attr] + '"';
      }
      return '<svg xmlns="http://www.w3.org/2000/svg"' + renderAttribsHTML + ">" + body + "</svg>";
    }

    function encodeSVGforURL(svg) {
      return svg.replace(/"/g, "'").replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ");
    }
    function svgToURL(svg) {
      return 'url("data:image/svg+xml,' + encodeSVGforURL(svg) + '")';
    }

    const defaultExtendedIconCustomisations = {
        ...defaultIconCustomisations,
        inline: false,
    };

    /**
     * Default SVG attributes
     */
    const svgDefaults = {
        'xmlns': 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink',
        'aria-hidden': true,
        'role': 'img',
    };
    /**
     * Style modes
     */
    const commonProps = {
        display: 'inline-block',
    };
    const monotoneProps = {
        'background-color': 'currentColor',
    };
    const coloredProps = {
        'background-color': 'transparent',
    };
    // Dynamically add common props to variables above
    const propsToAdd = {
        image: 'var(--svg)',
        repeat: 'no-repeat',
        size: '100% 100%',
    };
    const propsToAddTo = {
        '-webkit-mask': monotoneProps,
        'mask': monotoneProps,
        'background': coloredProps,
    };
    for (const prefix in propsToAddTo) {
        const list = propsToAddTo[prefix];
        for (const prop in propsToAdd) {
            list[prefix + '-' + prop] = propsToAdd[prop];
        }
    }
    /**
     * Fix size: add 'px' to numbers
     */
    function fixSize(value) {
        return value + (value.match(/^[-0-9.]+$/) ? 'px' : '');
    }
    /**
     * Generate icon from properties
     */
    function render(
    // Icon must be validated before calling this function
    icon, 
    // Properties
    props) {
        const customisations = mergeCustomisations(defaultExtendedIconCustomisations, props);
        // Check mode
        const mode = props.mode || 'svg';
        const componentProps = (mode === 'svg' ? { ...svgDefaults } : {});
        // Create style if missing
        let style = typeof props.style === 'string' ? props.style : '';
        // Get element properties
        for (let key in props) {
            const value = props[key];
            if (value === void 0) {
                continue;
            }
            switch (key) {
                // Properties to ignore
                case 'icon':
                case 'style':
                case 'onLoad':
                case 'mode':
                    break;
                // Boolean attributes
                case 'inline':
                case 'hFlip':
                case 'vFlip':
                    customisations[key] =
                        value === true || value === 'true' || value === 1;
                    break;
                // Flip as string: 'horizontal,vertical'
                case 'flip':
                    if (typeof value === 'string') {
                        flipFromString(customisations, value);
                    }
                    break;
                // Color: copy to style, add extra ';' in case style is missing it
                case 'color':
                    style =
                        style +
                            (style.length > 0 && style.trim().slice(-1) !== ';'
                                ? ';'
                                : '') +
                            'color: ' +
                            value +
                            '; ';
                    break;
                // Rotation as string
                case 'rotate':
                    if (typeof value === 'string') {
                        customisations[key] = rotateFromString(value);
                    }
                    else if (typeof value === 'number') {
                        customisations[key] = value;
                    }
                    break;
                // Remove aria-hidden
                case 'ariaHidden':
                case 'aria-hidden':
                    if (value !== true && value !== 'true') {
                        delete componentProps['aria-hidden'];
                    }
                    break;
                default:
                    if (key.slice(0, 3) === 'on:') {
                        // Svelte event
                        break;
                    }
                    // Copy missing property if it does not exist in customisations
                    if (defaultExtendedIconCustomisations[key] === void 0) {
                        componentProps[key] = value;
                    }
            }
        }
        // Generate icon
        const item = iconToSVG(icon, customisations);
        const renderAttribs = item.attributes;
        // Inline display
        if (customisations.inline) {
            // Style overrides it
            style = 'vertical-align: -0.125em; ' + style;
        }
        if (mode === 'svg') {
            // Add icon stuff
            Object.assign(componentProps, renderAttribs);
            // Style
            if (style !== '') {
                componentProps.style = style;
            }
            // Counter for ids based on "id" property to render icons consistently on server and client
            let localCounter = 0;
            let id = props.id;
            if (typeof id === 'string') {
                // Convert '-' to '_' to avoid errors in animations
                id = id.replace(/-/g, '_');
            }
            // Generate HTML
            return {
                svg: true,
                attributes: componentProps,
                body: replaceIDs(item.body, id ? () => id + 'ID' + localCounter++ : 'iconifySvelte'),
            };
        }
        // Render <span> with style
        const { body, width, height } = icon;
        const useMask = mode === 'mask' ||
            (mode === 'bg' ? false : body.indexOf('currentColor') !== -1);
        // Generate SVG
        const html = iconToHTML(body, {
            ...renderAttribs,
            width: width + '',
            height: height + '',
        });
        // Generate style
        const url = svgToURL(html);
        const styles = {
            '--svg': url,
            'width': fixSize(renderAttribs.width),
            'height': fixSize(renderAttribs.height),
            ...commonProps,
            ...(useMask ? monotoneProps : coloredProps),
        };
        let customStyle = '';
        for (const key in styles) {
            customStyle += key + ': ' + styles[key] + ';';
        }
        componentProps.style = customStyle + style;
        return {
            svg: false,
            attributes: componentProps,
        };
    }

    /**
     * Enable cache
     */
    function enableCache(storage) {
        toggleBrowserCache(storage, true);
    }
    /**
     * Disable cache
     */
    function disableCache(storage) {
        toggleBrowserCache(storage, false);
    }
    /**
     * Initialise stuff
     */
    // Enable short names
    allowSimpleNames(true);
    // Set API module
    setAPIModule('', fetchAPIModule);
    /**
     * Browser stuff
     */
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
        // Set cache and load existing cache
        initBrowserStorage();
        const _window = window;
        // Load icons from global "IconifyPreload"
        if (_window.IconifyPreload !== void 0) {
            const preload = _window.IconifyPreload;
            const err = 'Invalid IconifyPreload syntax.';
            if (typeof preload === 'object' && preload !== null) {
                (preload instanceof Array ? preload : [preload]).forEach((item) => {
                    try {
                        if (
                        // Check if item is an object and not null/array
                        typeof item !== 'object' ||
                            item === null ||
                            item instanceof Array ||
                            // Check for 'icons' and 'prefix'
                            typeof item.icons !== 'object' ||
                            typeof item.prefix !== 'string' ||
                            // Add icon set
                            !addCollection(item)) {
                            console.error(err);
                        }
                    }
                    catch (e) {
                        console.error(err);
                    }
                });
            }
        }
        // Set API from global "IconifyProviders"
        if (_window.IconifyProviders !== void 0) {
            const providers = _window.IconifyProviders;
            if (typeof providers === 'object' && providers !== null) {
                for (let key in providers) {
                    const err = 'IconifyProviders[' + key + '] is invalid.';
                    try {
                        const value = providers[key];
                        if (typeof value !== 'object' ||
                            !value ||
                            value.resources === void 0) {
                            continue;
                        }
                        if (!addAPIProvider(key, value)) {
                            console.error(err);
                        }
                    }
                    catch (e) {
                        console.error(err);
                    }
                }
            }
        }
    }
    /**
     * Check if component needs to be updated
     */
    function checkIconState(icon, state, mounted, callback, onload) {
        // Abort loading icon
        function abortLoading() {
            if (state.loading) {
                state.loading.abort();
                state.loading = null;
            }
        }
        // Icon is an object
        if (typeof icon === 'object' &&
            icon !== null &&
            typeof icon.body === 'string') {
            // Stop loading
            state.name = '';
            abortLoading();
            return { data: { ...defaultIconProps, ...icon } };
        }
        // Invalid icon?
        let iconName;
        if (typeof icon !== 'string' ||
            (iconName = stringToIcon(icon, false, true)) === null) {
            abortLoading();
            return null;
        }
        // Load icon
        const data = getIconData(iconName);
        if (!data) {
            // Icon data is not available
            // Do not load icon until component is mounted
            if (mounted && (!state.loading || state.loading.name !== icon)) {
                // New icon to load
                abortLoading();
                state.name = '';
                state.loading = {
                    name: icon,
                    abort: loadIcons([iconName], callback),
                };
            }
            return null;
        }
        // Icon data is available
        abortLoading();
        if (state.name !== icon) {
            state.name = icon;
            if (onload && !state.destroyed) {
                onload(icon);
            }
        }
        // Add classes
        const classes = ['iconify'];
        if (iconName.prefix !== '') {
            classes.push('iconify--' + iconName.prefix);
        }
        if (iconName.provider !== '') {
            classes.push('iconify--' + iconName.provider);
        }
        return { data, classes };
    }
    /**
     * Generate icon
     */
    function generateIcon(icon, props) {
        return icon
            ? render({
                ...defaultIconProps,
                ...icon,
            }, props)
            : null;
    }
    /**
     * Internal API
     */
    const _api = {
        getAPIConfig,
        setAPIModule,
        sendAPIQuery,
        setFetch,
        getFetch,
        listAPIProviders,
    };

    /* node_modules\@iconify\svelte\dist\Icon.svelte generated by Svelte v3.55.1 */
    const file$7 = "node_modules\\@iconify\\svelte\\dist\\Icon.svelte";

    // (108:0) {#if data}
    function create_if_block$4(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*data*/ ctx[0].svg) return create_if_block_1$3;
    		return create_else_block$2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(108:0) {#if data}",
    		ctx
    	});

    	return block;
    }

    // (113:1) {:else}
    function create_else_block$2(ctx) {
    	let span;
    	let span_levels = [/*data*/ ctx[0].attributes];
    	let span_data = {};

    	for (let i = 0; i < span_levels.length; i += 1) {
    		span_data = assign(span_data, span_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			span = element("span");
    			set_attributes(span, span_data);
    			add_location(span, file$7, 113, 2, 2001);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		p: function update(ctx, dirty) {
    			set_attributes(span, span_data = get_spread_update(span_levels, [dirty & /*data*/ 1 && /*data*/ ctx[0].attributes]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(113:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (109:1) {#if data.svg}
    function create_if_block_1$3(ctx) {
    	let svg;
    	let raw_value = /*data*/ ctx[0].body + "";
    	let svg_levels = [/*data*/ ctx[0].attributes];
    	let svg_data = {};

    	for (let i = 0; i < svg_levels.length; i += 1) {
    		svg_data = assign(svg_data, svg_levels[i]);
    	}

    	const block = {
    		c: function create() {
    			svg = svg_element("svg");
    			set_svg_attributes(svg, svg_data);
    			add_location(svg, file$7, 109, 2, 1933);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, svg, anchor);
    			svg.innerHTML = raw_value;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*data*/ 1 && raw_value !== (raw_value = /*data*/ ctx[0].body + "")) svg.innerHTML = raw_value;			set_svg_attributes(svg, svg_data = get_spread_update(svg_levels, [dirty & /*data*/ 1 && /*data*/ ctx[0].attributes]));
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(svg);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$3.name,
    		type: "if",
    		source: "(109:1) {#if data.svg}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$9(ctx) {
    	let if_block_anchor;
    	let if_block = /*data*/ ctx[0] && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*data*/ ctx[0]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$9.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$9($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Icon', slots, []);

    	const state = {
    		// Last icon name
    		name: '',
    		// Loading status
    		loading: null,
    		// Destroyed status
    		destroyed: false
    	};

    	// Mounted status
    	let mounted = false;

    	// Callback counter
    	let counter = 0;

    	// Generated data
    	let data;

    	const onLoad = icon => {
    		// Legacy onLoad property
    		if (typeof $$props.onLoad === 'function') {
    			$$props.onLoad(icon);
    		}

    		// on:load event
    		const dispatch = createEventDispatcher();

    		dispatch('load', { icon });
    	};

    	// Increase counter when loaded to force re-calculation of data
    	function loaded() {
    		$$invalidate(3, counter++, counter);
    	}

    	// Force re-render
    	onMount(() => {
    		$$invalidate(2, mounted = true);
    	});

    	// Abort loading when component is destroyed
    	onDestroy(() => {
    		$$invalidate(1, state.destroyed = true, state);

    		if (state.loading) {
    			state.loading.abort();
    			$$invalidate(1, state.loading = null, state);
    		}
    	});

    	$$self.$$set = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), exclude_internal_props($$new_props)));
    	};

    	$$self.$capture_state = () => ({
    		enableCache,
    		disableCache,
    		iconExists,
    		getIcon,
    		listIcons,
    		addIcon,
    		addCollection,
    		calculateSize,
    		replaceIDs,
    		buildIcon: iconToSVG,
    		loadIcons,
    		loadIcon,
    		addAPIProvider,
    		_api,
    		onMount,
    		onDestroy,
    		createEventDispatcher,
    		checkIconState,
    		generateIcon,
    		state,
    		mounted,
    		counter,
    		data,
    		onLoad,
    		loaded
    	});

    	$$self.$inject_state = $$new_props => {
    		$$invalidate(6, $$props = assign(assign({}, $$props), $$new_props));
    		if ('mounted' in $$props) $$invalidate(2, mounted = $$new_props.mounted);
    		if ('counter' in $$props) $$invalidate(3, counter = $$new_props.counter);
    		if ('data' in $$props) $$invalidate(0, data = $$new_props.data);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		{
    			const iconData = checkIconState($$props.icon, state, mounted, loaded, onLoad);
    			$$invalidate(0, data = iconData ? generateIcon(iconData.data, $$props) : null);

    			if (data && iconData.classes) {
    				// Add classes
    				$$invalidate(
    					0,
    					data.attributes['class'] = (typeof $$props['class'] === 'string'
    					? $$props['class'] + ' '
    					: '') + iconData.classes.join(' '),
    					data
    				);
    			}
    		}
    	};

    	$$props = exclude_internal_props($$props);
    	return [data, state, mounted, counter];
    }

    class Icon extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$9, create_fragment$9, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Icon",
    			options,
    			id: create_fragment$9.name
    		});
    	}
    }

    /* src\ui\StarLine\StarLine.svelte generated by Svelte v3.55.1 */
    const file$6 = "src\\ui\\StarLine\\StarLine.svelte";

    function create_fragment$8(ctx) {
    	let div1;
    	let div0;
    	let icon;
    	let current;

    	icon = new Icon({
    			props: {
    				icon: "iconoir:star",
    				width: "20",
    				height: "20"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			create_component(icon.$$.fragment);
    			attr_dev(div0, "class", "star-wrapper svelte-1ap7ev0");
    			add_location(div0, file$6, 4, 4, 101);
    			attr_dev(div1, "class", "wrapper-lines svelte-1ap7ev0");
    			add_location(div1, file$6, 3, 0, 68);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			mount_component(icon, div0, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_component(icon);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$8.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$8($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('StarLine', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<StarLine> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Icon });
    	return [];
    }

    class StarLine extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$8, create_fragment$8, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "StarLine",
    			options,
    			id: create_fragment$8.name
    		});
    	}
    }

    /* src\ui\Text\Text.svelte generated by Svelte v3.55.1 */

    const { Object: Object_1$2 } = globals;

    function create_fragment$7(ctx) {
    	let html_tag;
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(/*str*/ ctx[0], target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Text', slots, []);
    	let { text } = $$props;
    	let { wrapperTag = null } = $$props;
    	let { style = null } = $$props;
    	const changeCase = str => str.replace(/[A-Z]/g, letter => `-${letter.toLowerCase()}`);

    	const styleToStr = st => {
    		let str = '';

    		Object.keys(st).forEach(key => {
    			if (!!st[key]) str += `${changeCase(key)}: ${st[key]}${typeof st[key] === 'string' ? '' : 'px'}; `;
    		});

    		return str;
    	};

    	const str = !!wrapperTag
    	? `<${wrapperTag} style="${styleToStr(style)}">${text}</${wrapperTag}>`
    	: text;

    	$$self.$$.on_mount.push(function () {
    		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
    			console.warn("<Text> was created without expected prop 'text'");
    		}
    	});

    	const writable_props = ['text', 'wrapperTag', 'style'];

    	Object_1$2.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Text> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('wrapperTag' in $$props) $$invalidate(2, wrapperTag = $$props.wrapperTag);
    		if ('style' in $$props) $$invalidate(3, style = $$props.style);
    	};

    	$$self.$capture_state = () => ({
    		text,
    		wrapperTag,
    		style,
    		changeCase,
    		styleToStr,
    		str
    	});

    	$$self.$inject_state = $$props => {
    		if ('text' in $$props) $$invalidate(1, text = $$props.text);
    		if ('wrapperTag' in $$props) $$invalidate(2, wrapperTag = $$props.wrapperTag);
    		if ('style' in $$props) $$invalidate(3, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [str, text, wrapperTag, style];
    }

    class Text extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { text: 1, wrapperTag: 2, style: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Text",
    			options,
    			id: create_fragment$7.name
    		});
    	}

    	get text() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wrapperTag() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wrapperTag(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Text>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Text>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\ui\UnorderedList\UnorderedList.svelte generated by Svelte v3.55.1 */
    const file$5 = "src\\ui\\UnorderedList\\UnorderedList.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i];
    	return child_ctx;
    }

    // (7:0) {#if !!list && list.length > 0}
    function create_if_block$3(ctx) {
    	let ul;
    	let current;
    	let each_value = /*list*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			ul = element("ul");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			attr_dev(ul, "class", "svelte-nlo9jt");
    			toggle_class(ul, "list", /*list*/ ctx[0]);
    			toggle_class(ul, "green", /*theme*/ ctx[2] === 'green');
    			toggle_class(ul, "blue", /*theme*/ ctx[2] === 'blue');
    			toggle_class(ul, "red", /*theme*/ ctx[2] === 'red');
    			add_location(ul, file$5, 7, 4, 185);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*list, icon*/ 3) {
    				each_value = /*list*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(ul, null);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}

    			if (!current || dirty & /*list*/ 1) {
    				toggle_class(ul, "list", /*list*/ ctx[0]);
    			}

    			if (!current || dirty & /*theme*/ 4) {
    				toggle_class(ul, "green", /*theme*/ ctx[2] === 'green');
    			}

    			if (!current || dirty & /*theme*/ 4) {
    				toggle_class(ul, "blue", /*theme*/ ctx[2] === 'blue');
    			}

    			if (!current || dirty & /*theme*/ 4) {
    				toggle_class(ul, "red", /*theme*/ ctx[2] === 'red');
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(7:0) {#if !!list && list.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (9:8) {#each list as el}
    function create_each_block$1(ctx) {
    	let li;
    	let div;
    	let icon_1;
    	let t0;
    	let html_tag;
    	let raw_value = /*el*/ ctx[3] + "";
    	let t1;
    	let current;

    	icon_1 = new Icon({
    			props: {
    				icon: /*icon*/ ctx[1],
    				width: "20",
    				height: "20"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			li = element("li");
    			div = element("div");
    			create_component(icon_1.$$.fragment);
    			t0 = space();
    			html_tag = new HtmlTag(false);
    			t1 = space();
    			attr_dev(div, "class", "icon-wrapper svelte-nlo9jt");
    			add_location(div, file$5, 10, 16, 354);
    			html_tag.a = t1;
    			attr_dev(li, "class", "svelte-nlo9jt");
    			add_location(li, file$5, 9, 12, 332);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div);
    			mount_component(icon_1, div, null);
    			append_dev(li, t0);
    			html_tag.m(raw_value, li);
    			append_dev(li, t1);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const icon_1_changes = {};
    			if (dirty & /*icon*/ 2) icon_1_changes.icon = /*icon*/ ctx[1];
    			icon_1.$set(icon_1_changes);
    			if ((!current || dirty & /*list*/ 1) && raw_value !== (raw_value = /*el*/ ctx[3] + "")) html_tag.p(raw_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			destroy_component(icon_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(9:8) {#each list as el}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let if_block_anchor;
    	let current;
    	let if_block = !!/*list*/ ctx[0] && /*list*/ ctx[0].length > 0 && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!!/*list*/ ctx[0] && /*list*/ ctx[0].length > 0) {
    				if (if_block) {
    					if_block.p(ctx, dirty);

    					if (dirty & /*list*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('UnorderedList', slots, []);
    	let { list } = $$props;
    	let { icon = 'nimbus:planet' } = $$props;
    	let { theme = null } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (list === undefined && !('list' in $$props || $$self.$$.bound[$$self.$$.props['list']])) {
    			console.warn("<UnorderedList> was created without expected prop 'list'");
    		}
    	});

    	const writable_props = ['list', 'icon', 'theme'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<UnorderedList> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('list' in $$props) $$invalidate(0, list = $$props.list);
    		if ('icon' in $$props) $$invalidate(1, icon = $$props.icon);
    		if ('theme' in $$props) $$invalidate(2, theme = $$props.theme);
    	};

    	$$self.$capture_state = () => ({ Icon, list, icon, theme });

    	$$self.$inject_state = $$props => {
    		if ('list' in $$props) $$invalidate(0, list = $$props.list);
    		if ('icon' in $$props) $$invalidate(1, icon = $$props.icon);
    		if ('theme' in $$props) $$invalidate(2, theme = $$props.theme);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [list, icon, theme];
    }

    class UnorderedList extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { list: 0, icon: 1, theme: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "UnorderedList",
    			options,
    			id: create_fragment$6.name
    		});
    	}

    	get list() {
    		throw new Error("<UnorderedList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set list(value) {
    		throw new Error("<UnorderedList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get icon() {
    		throw new Error("<UnorderedList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set icon(value) {
    		throw new Error("<UnorderedList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get theme() {
    		throw new Error("<UnorderedList>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set theme(value) {
    		throw new Error("<UnorderedList>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\About\About.svelte generated by Svelte v3.55.1 */
    const file$4 = "src\\components\\About\\About.svelte";

    // (9:0) {#if !!description}
    function create_if_block_2$1(ctx) {
    	let text_1;
    	let current;

    	text_1 = new Text({
    			props: {
    				text: /*description*/ ctx[0],
    				style: { textAlign: 'center' },
    				wrapperTag: "div"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(text_1.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};
    			if (dirty & /*description*/ 1) text_1_changes.text = /*description*/ ctx[0];
    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2$1.name,
    		type: "if",
    		source: "(9:0) {#if !!description}",
    		ctx
    	});

    	return block;
    }

    // (13:0) {#if !!pros && pros.length > 0}
    function create_if_block_1$2(ctx) {
    	let h3;
    	let t1;
    	let unorderedlist;
    	let current;

    	unorderedlist = new UnorderedList({
    			props: { list: /*pros*/ ctx[1], theme: "green" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "ОБО МНЕ:";
    			t1 = space();
    			create_component(unorderedlist.$$.fragment);
    			attr_dev(h3, "class", "svelte-1f0h50c");
    			add_location(h3, file$4, 13, 4, 424);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(unorderedlist, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const unorderedlist_changes = {};
    			if (dirty & /*pros*/ 2) unorderedlist_changes.list = /*pros*/ ctx[1];
    			unorderedlist.$set(unorderedlist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(unorderedlist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(unorderedlist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			destroy_component(unorderedlist, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$2.name,
    		type: "if",
    		source: "(13:0) {#if !!pros && pros.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (20:0) {#if !!process}
    function create_if_block$2(ctx) {
    	let h3;
    	let t1;
    	let text_1;
    	let current;

    	text_1 = new Text({
    			props: {
    				text: /*process*/ ctx[2],
    				style: { textAlign: 'center', fontSize: 14 },
    				wrapperTag: "div"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			h3.textContent = "КАК ПРОХОДЯТ ЗАНЯТИЯ";
    			t1 = space();
    			create_component(text_1.$$.fragment);
    			attr_dev(h3, "class", "svelte-1f0h50c");
    			add_location(h3, file$4, 20, 4, 538);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(text_1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const text_1_changes = {};
    			if (dirty & /*process*/ 4) text_1_changes.text = /*process*/ ctx[2];
    			text_1.$set(text_1_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(text_1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(text_1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			destroy_component(text_1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(20:0) {#if !!process}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let t0;
    	let t1;
    	let starline0;
    	let t2;
    	let t3;
    	let starline1;
    	let current;
    	let if_block0 = !!/*description*/ ctx[0] && create_if_block_2$1(ctx);
    	let if_block1 = !!/*pros*/ ctx[1] && /*pros*/ ctx[1].length > 0 && create_if_block_1$2(ctx);
    	starline0 = new StarLine({ $$inline: true });
    	let if_block2 = !!/*process*/ ctx[2] && create_if_block$2(ctx);
    	starline1 = new StarLine({ $$inline: true });

    	const block = {
    		c: function create() {
    			if (if_block0) if_block0.c();
    			t0 = space();
    			if (if_block1) if_block1.c();
    			t1 = space();
    			create_component(starline0.$$.fragment);
    			t2 = space();
    			if (if_block2) if_block2.c();
    			t3 = space();
    			create_component(starline1.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block0) if_block0.m(target, anchor);
    			insert_dev(target, t0, anchor);
    			if (if_block1) if_block1.m(target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(starline0, target, anchor);
    			insert_dev(target, t2, anchor);
    			if (if_block2) if_block2.m(target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(starline1, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (!!/*description*/ ctx[0]) {
    				if (if_block0) {
    					if_block0.p(ctx, dirty);

    					if (dirty & /*description*/ 1) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2$1(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(t0.parentNode, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!!/*pros*/ ctx[1] && /*pros*/ ctx[1].length > 0) {
    				if (if_block1) {
    					if_block1.p(ctx, dirty);

    					if (dirty & /*pros*/ 2) {
    						transition_in(if_block1, 1);
    					}
    				} else {
    					if_block1 = create_if_block_1$2(ctx);
    					if_block1.c();
    					transition_in(if_block1, 1);
    					if_block1.m(t1.parentNode, t1);
    				}
    			} else if (if_block1) {
    				group_outros();

    				transition_out(if_block1, 1, 1, () => {
    					if_block1 = null;
    				});

    				check_outros();
    			}

    			if (!!/*process*/ ctx[2]) {
    				if (if_block2) {
    					if_block2.p(ctx, dirty);

    					if (dirty & /*process*/ 4) {
    						transition_in(if_block2, 1);
    					}
    				} else {
    					if_block2 = create_if_block$2(ctx);
    					if_block2.c();
    					transition_in(if_block2, 1);
    					if_block2.m(t3.parentNode, t3);
    				}
    			} else if (if_block2) {
    				group_outros();

    				transition_out(if_block2, 1, 1, () => {
    					if_block2 = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			transition_in(if_block1);
    			transition_in(starline0.$$.fragment, local);
    			transition_in(if_block2);
    			transition_in(starline1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			transition_out(if_block1);
    			transition_out(starline0.$$.fragment, local);
    			transition_out(if_block2);
    			transition_out(starline1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (if_block0) if_block0.d(detaching);
    			if (detaching) detach_dev(t0);
    			if (if_block1) if_block1.d(detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(starline0, detaching);
    			if (detaching) detach_dev(t2);
    			if (if_block2) if_block2.d(detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(starline1, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('About', slots, []);
    	let { description } = $$props;
    	let { pros } = $$props;
    	let { process } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (description === undefined && !('description' in $$props || $$self.$$.bound[$$self.$$.props['description']])) {
    			console.warn("<About> was created without expected prop 'description'");
    		}

    		if (pros === undefined && !('pros' in $$props || $$self.$$.bound[$$self.$$.props['pros']])) {
    			console.warn("<About> was created without expected prop 'pros'");
    		}

    		if (process === undefined && !('process' in $$props || $$self.$$.bound[$$self.$$.props['process']])) {
    			console.warn("<About> was created without expected prop 'process'");
    		}
    	});

    	const writable_props = ['description', 'pros', 'process'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<About> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('description' in $$props) $$invalidate(0, description = $$props.description);
    		if ('pros' in $$props) $$invalidate(1, pros = $$props.pros);
    		if ('process' in $$props) $$invalidate(2, process = $$props.process);
    	};

    	$$self.$capture_state = () => ({
    		StarLine,
    		Text,
    		UnorderedList,
    		description,
    		pros,
    		process
    	});

    	$$self.$inject_state = $$props => {
    		if ('description' in $$props) $$invalidate(0, description = $$props.description);
    		if ('pros' in $$props) $$invalidate(1, pros = $$props.pros);
    		if ('process' in $$props) $$invalidate(2, process = $$props.process);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [description, pros, process];
    }

    class About extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { description: 0, pros: 1, process: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "About",
    			options,
    			id: create_fragment$5.name
    		});
    	}

    	get description() {
    		throw new Error("<About>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set description(value) {
    		throw new Error("<About>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get pros() {
    		throw new Error("<About>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set pros(value) {
    		throw new Error("<About>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get process() {
    		throw new Error("<About>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set process(value) {
    		throw new Error("<About>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    function collapse (node, params) {

        const defaultParams = {
            open: true,
            duration: 0.2,
            easing: 'ease'
        };

        params = Object.assign(defaultParams, params);

        const noop = () => {};
        let transitionEndResolve = noop;
        let transitionEndReject = noop;

        const listener = node.addEventListener('transitionend', () => {
            transitionEndResolve();
            transitionEndResolve = noop;
            transitionEndReject = noop;
        });

        // convenience functions
        async function asyncTransitionEnd () {
            return new Promise((resolve, reject) => {
                transitionEndResolve = resolve;
                transitionEndReject = reject;
            })
        }

        async function nextFrame () {
            return new Promise(requestAnimationFrame)
        }

        function transition () {
            return `height ${params.duration}s ${params.easing}`
        }

        // set initial styles
        node.style.overflow = 'hidden';
        node.style.transition = transition();
        node.style.height = params.open ? 'auto' : '0px';

        async function enter () {

            // height is already in pixels
            // start the transition
            node.style.height = node.scrollHeight + 'px';

            // wait for transition to end,
            // then switch back to height auto
            try {
                await asyncTransitionEnd();
                node.style.height = 'auto';
            } catch(err) {
                // interrupted by a leave transition
            }

        }

        async function leave () {

            if (node.style.height === 'auto') {

                // temporarily turn transitions off
                node.style.transition = 'none';
                await nextFrame();

                // set height to pixels, and turn transition back on
                node.style.height = node.scrollHeight + 'px';
                node.style.transition = transition();
                await nextFrame();

                // start the transition
                node.style.height = '0px';

            }
            else {

                // we are interrupting an enter transition
                transitionEndReject();
                node.style.height = '0px';

            }

        }

        function update (newParams) {
            params = Object.assign(params, newParams);
            params.open ? enter() : leave();
        }

        function destroy () {
            node.removeEventListener('transitionend', listener);
        }

        return { update, destroy }

    }

    const subscriber_queue = [];
    /**
     * Create a `Writable` store that allows both updating and reading by subscription.
     * @param {*=}value initial value
     * @param {StartStopNotifier=}start start and stop notifications for subscriptions
     */
    function writable(value, start = noop) {
        let stop;
        const subscribers = new Set();
        function set(new_value) {
            if (safe_not_equal(value, new_value)) {
                value = new_value;
                if (stop) { // store is ready
                    const run_queue = !subscriber_queue.length;
                    for (const subscriber of subscribers) {
                        subscriber[1]();
                        subscriber_queue.push(subscriber, value);
                    }
                    if (run_queue) {
                        for (let i = 0; i < subscriber_queue.length; i += 2) {
                            subscriber_queue[i][0](subscriber_queue[i + 1]);
                        }
                        subscriber_queue.length = 0;
                    }
                }
            }
        }
        function update(fn) {
            set(fn(value));
        }
        function subscribe(run, invalidate = noop) {
            const subscriber = [run, invalidate];
            subscribers.add(subscriber);
            if (subscribers.size === 1) {
                stop = start(set) || noop;
            }
            run(value);
            return () => {
                subscribers.delete(subscriber);
                if (subscribers.size === 0) {
                    stop();
                    stop = null;
                }
            };
        }
        return { set, update, subscribe };
    }

    /* node_modules\svelte-collapsible\src\components\Accordion.svelte generated by Svelte v3.55.1 */

    const { Object: Object_1$1 } = globals;
    const file$3 = "node_modules\\svelte-collapsible\\src\\components\\Accordion.svelte";

    function create_fragment$4(ctx) {
    	let ul;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[4].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[3], null);

    	const block = {
    		c: function create() {
    			ul = element("ul");
    			if (default_slot) default_slot.c();
    			attr_dev(ul, "class", "accordion svelte-da9j5z");
    			add_location(ul, file$3, 34, 0, 829);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, ul, anchor);

    			if (default_slot) {
    				default_slot.m(ul, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 8)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[3],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[3])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[3], dirty, null),
    						null
    					);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(ul);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Accordion', slots, ['default']);
    	let { duration = 0.2 } = $$props;
    	let { easing = 'ease' } = $$props;
    	let { key = null } = $$props;
    	const dispatch = createEventDispatcher();

    	// create a store for the children to access
    	const store = writable({ key, duration, easing });

    	// when the store changes, update the key prop
    	const unsubscribe = store.subscribe(s => {
    		$$invalidate(0, key = s.key);
    		dispatch('change', { key });
    	});

    	// make the store available to children
    	setContext('svelte-collapsible-accordion', store);

    	onDestroy(unsubscribe);
    	const writable_props = ['duration', 'easing', 'key'];

    	Object_1$1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Accordion> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('easing' in $$props) $$invalidate(2, easing = $$props.easing);
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    		if ('$$scope' in $$props) $$invalidate(3, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		onDestroy,
    		setContext,
    		createEventDispatcher,
    		writable,
    		duration,
    		easing,
    		key,
    		dispatch,
    		store,
    		unsubscribe
    	});

    	$$self.$inject_state = $$props => {
    		if ('duration' in $$props) $$invalidate(1, duration = $$props.duration);
    		if ('easing' in $$props) $$invalidate(2, easing = $$props.easing);
    		if ('key' in $$props) $$invalidate(0, key = $$props.key);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*key*/ 1) {
    			// when the key prop changes, update the store
    			store.update(s => Object.assign(s, { key }));
    		}
    	};

    	return [key, duration, easing, $$scope, slots];
    }

    class Accordion extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { duration: 1, easing: 2, key: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Accordion",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get duration() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set duration(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get easing() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set easing(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get key() {
    		throw new Error("<Accordion>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<Accordion>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* node_modules\svelte-collapsible\src\components\AccordionItem.svelte generated by Svelte v3.55.1 */

    const { Object: Object_1 } = globals;
    const file$2 = "node_modules\\svelte-collapsible\\src\\components\\AccordionItem.svelte";
    const get_body_slot_changes = dirty => ({});
    const get_body_slot_context = ctx => ({});
    const get_header_slot_changes = dirty => ({});
    const get_header_slot_context = ctx => ({});

    function create_fragment$3(ctx) {
    	let li;
    	let div0;
    	let t0;
    	let div1;
    	let collapse_action;
    	let t1;
    	let li_aria_expanded_value;
    	let current;
    	let mounted;
    	let dispose;
    	const header_slot_template = /*#slots*/ ctx[6].header;
    	const header_slot = create_slot(header_slot_template, ctx, /*$$scope*/ ctx[5], get_header_slot_context);
    	const body_slot_template = /*#slots*/ ctx[6].body;
    	const body_slot = create_slot(body_slot_template, ctx, /*$$scope*/ ctx[5], get_body_slot_context);
    	const default_slot_template = /*#slots*/ ctx[6].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[5], null);

    	const block = {
    		c: function create() {
    			li = element("li");
    			div0 = element("div");
    			if (header_slot) header_slot.c();
    			t0 = space();
    			div1 = element("div");
    			if (body_slot) body_slot.c();
    			t1 = space();
    			if (default_slot) default_slot.c();
    			attr_dev(div0, "class", "accordion-item-header svelte-13br4ya");
    			add_location(div0, file$2, 32, 4, 598);
    			attr_dev(div1, "class", "accordion-item-body");
    			add_location(div1, file$2, 36, 4, 705);
    			attr_dev(li, "class", "accordion-item");
    			attr_dev(li, "aria-expanded", li_aria_expanded_value = /*params*/ ctx[0].open);
    			add_location(li, file$2, 30, 0, 537);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, div0);

    			if (header_slot) {
    				header_slot.m(div0, null);
    			}

    			append_dev(li, t0);
    			append_dev(li, div1);

    			if (body_slot) {
    				body_slot.m(div1, null);
    			}

    			append_dev(li, t1);

    			if (default_slot) {
    				default_slot.m(li, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = [
    					listen_dev(div0, "click", /*handleToggle*/ ctx[2], false, false, false),
    					action_destroyer(collapse_action = collapse.call(null, div1, /*params*/ ctx[0]))
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (header_slot) {
    				if (header_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						header_slot,
    						header_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(header_slot_template, /*$$scope*/ ctx[5], dirty, get_header_slot_changes),
    						get_header_slot_context
    					);
    				}
    			}

    			if (body_slot) {
    				if (body_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						body_slot,
    						body_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(body_slot_template, /*$$scope*/ ctx[5], dirty, get_body_slot_changes),
    						get_body_slot_context
    					);
    				}
    			}

    			if (collapse_action && is_function(collapse_action.update) && dirty & /*params*/ 1) collapse_action.update.call(null, /*params*/ ctx[0]);

    			if (default_slot) {
    				if (default_slot.p && (!current || dirty & /*$$scope*/ 32)) {
    					update_slot_base(
    						default_slot,
    						default_slot_template,
    						ctx,
    						/*$$scope*/ ctx[5],
    						!current
    						? get_all_dirty_from_scope(/*$$scope*/ ctx[5])
    						: get_slot_changes(default_slot_template, /*$$scope*/ ctx[5], dirty, null),
    						null
    					);
    				}
    			}

    			if (!current || dirty & /*params*/ 1 && li_aria_expanded_value !== (li_aria_expanded_value = /*params*/ ctx[0].open)) {
    				attr_dev(li, "aria-expanded", li_aria_expanded_value);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(header_slot, local);
    			transition_in(body_slot, local);
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(header_slot, local);
    			transition_out(body_slot, local);
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    			if (header_slot) header_slot.d(detaching);
    			if (body_slot) body_slot.d(detaching);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let params;
    	let $store;
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AccordionItem', slots, ['header','body','default']);
    	let { key } = $$props;
    	const store = getContext('svelte-collapsible-accordion');
    	validate_store(store, 'store');
    	component_subscribe($$self, store, value => $$invalidate(4, $store = value));

    	function handleToggle() {
    		if (params.open) {
    			store.update(s => Object.assign(s, { key: null }));
    		} else {
    			store.update(s => Object.assign(s, { key }));
    		}
    	}

    	$$self.$$.on_mount.push(function () {
    		if (key === undefined && !('key' in $$props || $$self.$$.bound[$$self.$$.props['key']])) {
    			console.warn("<AccordionItem> was created without expected prop 'key'");
    		}
    	});

    	const writable_props = ['key'];

    	Object_1.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AccordionItem> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('key' in $$props) $$invalidate(3, key = $$props.key);
    		if ('$$scope' in $$props) $$invalidate(5, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({
    		getContext,
    		collapse,
    		key,
    		store,
    		handleToggle,
    		params,
    		$store
    	});

    	$$self.$inject_state = $$props => {
    		if ('key' in $$props) $$invalidate(3, key = $$props.key);
    		if ('params' in $$props) $$invalidate(0, params = $$props.params);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	$$self.$$.update = () => {
    		if ($$self.$$.dirty & /*$store, key*/ 24) {
    			$$invalidate(0, params = {
    				open: $store.key === key,
    				duration: $store.duration,
    				easing: $store.easing
    			});
    		}
    	};

    	return [params, store, handleToggle, key, $store, $$scope, slots];
    }

    class AccordionItem extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { key: 3 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AccordionItem",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get key() {
    		throw new Error("<AccordionItem>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set key(value) {
    		throw new Error("<AccordionItem>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\ui\Button\Button.svelte generated by Svelte v3.55.1 */
    const file$1 = "src\\ui\\Button\\Button.svelte";

    // (20:0) {:else}
    function create_else_block$1(ctx) {
    	let button;
    	let t0;
    	let t1;
    	let t2;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block0 = /*withEnterIcon*/ ctx[2] && create_if_block_4(ctx);
    	let if_block1 = /*fullWidth*/ ctx[3] && create_if_block_3(ctx);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			t1 = text(/*text*/ ctx[4]);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(button, "class", "btn svelte-nh480y");
    			attr_dev(button, "style", /*style*/ ctx[5]);
    			toggle_class(button, "fullWidth", /*fullWidth*/ ctx[3]);
    			add_location(button, file$1, 20, 4, 587);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			if (if_block0) if_block0.m(button, null);
    			append_dev(button, t0);
    			append_dev(button, t1);
    			append_dev(button, t2);
    			if (if_block1) if_block1.m(button, null);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*onClick*/ ctx[0])) /*onClick*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (/*withEnterIcon*/ ctx[2]) {
    				if (if_block0) {
    					if (dirty & /*withEnterIcon*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_4(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(button, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*text*/ 16) set_data_dev(t1, /*text*/ ctx[4]);

    			if (/*fullWidth*/ ctx[3]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block_3(ctx);
    					if_block1.c();
    					if_block1.m(button, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (!current || dirty & /*style*/ 32) {
    				attr_dev(button, "style", /*style*/ ctx[5]);
    			}

    			if (!current || dirty & /*fullWidth*/ 8) {
    				toggle_class(button, "fullWidth", /*fullWidth*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(20:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (10:0) {#if typeof onClick === "string"}
    function create_if_block$1(ctx) {
    	let a;
    	let t0;
    	let t1;
    	let t2;
    	let current;
    	let if_block0 = /*withEnterIcon*/ ctx[2] && create_if_block_2(ctx);
    	let if_block1 = /*fullWidth*/ ctx[3] && create_if_block_1$1(ctx);

    	const block = {
    		c: function create() {
    			a = element("a");
    			if (if_block0) if_block0.c();
    			t0 = space();
    			t1 = text(/*text*/ ctx[4]);
    			t2 = space();
    			if (if_block1) if_block1.c();
    			attr_dev(a, "href", /*onClick*/ ctx[0]);
    			attr_dev(a, "target", /*target*/ ctx[1]);
    			attr_dev(a, "class", "btn svelte-nh480y");
    			attr_dev(a, "style", /*style*/ ctx[5]);
    			toggle_class(a, "fullWidth", /*fullWidth*/ ctx[3]);
    			add_location(a, file$1, 10, 4, 275);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, a, anchor);
    			if (if_block0) if_block0.m(a, null);
    			append_dev(a, t0);
    			append_dev(a, t1);
    			append_dev(a, t2);
    			if (if_block1) if_block1.m(a, null);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (/*withEnterIcon*/ ctx[2]) {
    				if (if_block0) {
    					if (dirty & /*withEnterIcon*/ 4) {
    						transition_in(if_block0, 1);
    					}
    				} else {
    					if_block0 = create_if_block_2(ctx);
    					if_block0.c();
    					transition_in(if_block0, 1);
    					if_block0.m(a, t0);
    				}
    			} else if (if_block0) {
    				group_outros();

    				transition_out(if_block0, 1, 1, () => {
    					if_block0 = null;
    				});

    				check_outros();
    			}

    			if (!current || dirty & /*text*/ 16) set_data_dev(t1, /*text*/ ctx[4]);

    			if (/*fullWidth*/ ctx[3]) {
    				if (if_block1) ; else {
    					if_block1 = create_if_block_1$1(ctx);
    					if_block1.c();
    					if_block1.m(a, null);
    				}
    			} else if (if_block1) {
    				if_block1.d(1);
    				if_block1 = null;
    			}

    			if (!current || dirty & /*onClick*/ 1) {
    				attr_dev(a, "href", /*onClick*/ ctx[0]);
    			}

    			if (!current || dirty & /*target*/ 2) {
    				attr_dev(a, "target", /*target*/ ctx[1]);
    			}

    			if (!current || dirty & /*style*/ 32) {
    				attr_dev(a, "style", /*style*/ ctx[5]);
    			}

    			if (!current || dirty & /*fullWidth*/ 8) {
    				toggle_class(a, "fullWidth", /*fullWidth*/ ctx[3]);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block0);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block0);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(a);
    			if (if_block0) if_block0.d();
    			if (if_block1) if_block1.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(10:0) {#if typeof onClick === \\\"string\\\"}",
    		ctx
    	});

    	return block;
    }

    // (22:8) {#if withEnterIcon}
    function create_if_block_4(ctx) {
    	let icon;
    	let current;

    	icon = new Icon({
    			props: {
    				icon: "iconoir:long-arrow-down-right",
    				width: "25",
    				height: "25"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_4.name,
    		type: "if",
    		source: "(22:8) {#if withEnterIcon}",
    		ctx
    	});

    	return block;
    }

    // (26:8) {#if fullWidth}
    function create_if_block_3(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			set_style(span, "width", "20px");
    			add_location(span, file$1, 26, 12, 831);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_3.name,
    		type: "if",
    		source: "(26:8) {#if fullWidth}",
    		ctx
    	});

    	return block;
    }

    // (12:8) {#if withEnterIcon}
    function create_if_block_2(ctx) {
    	let icon;
    	let current;

    	icon = new Icon({
    			props: {
    				icon: "iconoir:long-arrow-down-right",
    				width: "25",
    				height: "25"
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(icon.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(icon, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(icon, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(12:8) {#if withEnterIcon}",
    		ctx
    	});

    	return block;
    }

    // (16:8) {#if fullWidth}
    function create_if_block_1$1(ctx) {
    	let span;

    	const block = {
    		c: function create() {
    			span = element("span");
    			set_style(span, "width", "20px");
    			add_location(span, file$1, 16, 12, 519);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, span, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1$1.name,
    		type: "if",
    		source: "(16:8) {#if fullWidth}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$1, create_else_block$1];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (typeof /*onClick*/ ctx[0] === "string") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Button', slots, []);
    	let { onClick = null } = $$props;
    	let { target = "_self" } = $$props;
    	let { withEnterIcon = false } = $$props;
    	let { fullWidth = false } = $$props;
    	let { text } = $$props;
    	let { style = null } = $$props;

    	$$self.$$.on_mount.push(function () {
    		if (text === undefined && !('text' in $$props || $$self.$$.bound[$$self.$$.props['text']])) {
    			console.warn("<Button> was created without expected prop 'text'");
    		}
    	});

    	const writable_props = ['onClick', 'target', 'withEnterIcon', 'fullWidth', 'text', 'style'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ('onClick' in $$props) $$invalidate(0, onClick = $$props.onClick);
    		if ('target' in $$props) $$invalidate(1, target = $$props.target);
    		if ('withEnterIcon' in $$props) $$invalidate(2, withEnterIcon = $$props.withEnterIcon);
    		if ('fullWidth' in $$props) $$invalidate(3, fullWidth = $$props.fullWidth);
    		if ('text' in $$props) $$invalidate(4, text = $$props.text);
    		if ('style' in $$props) $$invalidate(5, style = $$props.style);
    	};

    	$$self.$capture_state = () => ({
    		Icon,
    		onClick,
    		target,
    		withEnterIcon,
    		fullWidth,
    		text,
    		style
    	});

    	$$self.$inject_state = $$props => {
    		if ('onClick' in $$props) $$invalidate(0, onClick = $$props.onClick);
    		if ('target' in $$props) $$invalidate(1, target = $$props.target);
    		if ('withEnterIcon' in $$props) $$invalidate(2, withEnterIcon = $$props.withEnterIcon);
    		if ('fullWidth' in $$props) $$invalidate(3, fullWidth = $$props.fullWidth);
    		if ('text' in $$props) $$invalidate(4, text = $$props.text);
    		if ('style' in $$props) $$invalidate(5, style = $$props.style);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [onClick, target, withEnterIcon, fullWidth, text, style];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {
    			onClick: 0,
    			target: 1,
    			withEnterIcon: 2,
    			fullWidth: 3,
    			text: 4,
    			style: 5
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get onClick() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set onClick(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get target() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set target(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get withEnterIcon() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set withEnterIcon(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get fullWidth() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set fullWidth(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get text() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set text(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get style() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set style(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\components\TypesOfClasses\TypesOfClasses.svelte generated by Svelte v3.55.1 */
    const file = "src\\components\\TypesOfClasses\\TypesOfClasses.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[3] = list[i].title;
    	child_ctx[4] = list[i].btn;
    	child_ctx[5] = list[i].points;
    	child_ctx[7] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[8] = list[i];
    	return child_ctx;
    }

    function get_each_context_2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	return child_ctx;
    }

    // (15:16) 
    function create_header_slot(ctx) {
    	let button;
    	let div2;
    	let div0;
    	let icon0;
    	let t0;
    	let div1;
    	let icon1;
    	let t1;
    	let span;
    	let t2_value = /*point*/ ctx[8].title + "";
    	let t2;
    	let t3;
    	let current;

    	icon0 = new Icon({
    			props: {
    				icon: "iconoir:plus",
    				width: 24,
    				height: 24
    			},
    			$$inline: true
    		});

    	icon1 = new Icon({
    			props: {
    				icon: "iconoir:minus",
    				width: 24,
    				height: 24
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			button = element("button");
    			div2 = element("div");
    			div0 = element("div");
    			create_component(icon0.$$.fragment);
    			t0 = space();
    			div1 = element("div");
    			create_component(icon1.$$.fragment);
    			t1 = space();
    			span = element("span");
    			t2 = text(t2_value);
    			t3 = space();
    			attr_dev(div0, "class", "iconWrapper svelte-10qg8tf");
    			toggle_class(div0, "transparent", /*key*/ ctx[1] === /*point*/ ctx[8].id);
    			add_location(div0, file, 16, 24, 663);
    			attr_dev(div1, "class", "iconWrapper svelte-10qg8tf");
    			toggle_class(div1, "transparent", /*key*/ ctx[1] !== /*point*/ ctx[8].id);
    			add_location(div1, file, 22, 24, 948);
    			attr_dev(div2, "class", "iconsWrapper svelte-10qg8tf");
    			add_location(div2, file, 15, 20, 611);
    			add_location(span, file, 29, 20, 1258);
    			attr_dev(button, "slot", "header");
    			attr_dev(button, "class", "header svelte-10qg8tf");
    			add_location(button, file, 14, 16, 552);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);
    			append_dev(button, div2);
    			append_dev(div2, div0);
    			mount_component(icon0, div0, null);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			mount_component(icon1, div1, null);
    			append_dev(button, t1);
    			append_dev(button, span);
    			append_dev(span, t2);
    			append_dev(button, t3);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (!current || dirty & /*key, classes*/ 3) {
    				toggle_class(div0, "transparent", /*key*/ ctx[1] === /*point*/ ctx[8].id);
    			}

    			if (!current || dirty & /*key, classes*/ 3) {
    				toggle_class(div1, "transparent", /*key*/ ctx[1] !== /*point*/ ctx[8].id);
    			}

    			if ((!current || dirty & /*classes*/ 1) && t2_value !== (t2_value = /*point*/ ctx[8].title + "")) set_data_dev(t2, t2_value);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(icon0.$$.fragment, local);
    			transition_in(icon1.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(icon0.$$.fragment, local);
    			transition_out(icon1.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			destroy_component(icon0);
    			destroy_component(icon1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_header_slot.name,
    		type: "slot",
    		source: "(15:16) ",
    		ctx
    	});

    	return block;
    }

    // (38:24) {:else}
    function create_else_block(ctx) {
    	let unorderedlist;
    	let current;

    	unorderedlist = new UnorderedList({
    			props: { list: /*item*/ ctx[11], theme: "blue" },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(unorderedlist.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(unorderedlist, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const unorderedlist_changes = {};
    			if (dirty & /*classes*/ 1) unorderedlist_changes.list = /*item*/ ctx[11];
    			unorderedlist.$set(unorderedlist_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(unorderedlist.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(unorderedlist.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(unorderedlist, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(38:24) {:else}",
    		ctx
    	});

    	return block;
    }

    // (36:24) {#if typeof item === "string"}
    function create_if_block_1(ctx) {
    	let html_tag;
    	let raw_value = /*item*/ ctx[11] + "";
    	let html_anchor;

    	const block = {
    		c: function create() {
    			html_tag = new HtmlTag(false);
    			html_anchor = empty();
    			html_tag.a = html_anchor;
    		},
    		m: function mount(target, anchor) {
    			html_tag.m(raw_value, target, anchor);
    			insert_dev(target, html_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*classes*/ 1 && raw_value !== (raw_value = /*item*/ ctx[11] + "")) html_tag.p(raw_value);
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(html_anchor);
    			if (detaching) html_tag.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(36:24) {#if typeof item === \\\"string\\\"}",
    		ctx
    	});

    	return block;
    }

    // (35:20) {#each point.content as item}
    function create_each_block_2(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block_1, create_else_block];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (typeof /*item*/ ctx[11] === "string") return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_2.name,
    		type: "each",
    		source: "(35:20) {#each point.content as item}",
    		ctx
    	});

    	return block;
    }

    // (34:16) 
    function create_body_slot(ctx) {
    	let div;
    	let t;
    	let current;
    	let each_value_2 = /*point*/ ctx[8].content;
    	validate_each_argument(each_value_2);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_2.length; i += 1) {
    		each_blocks[i] = create_each_block_2(get_each_context_2(ctx, each_value_2, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			div = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t = space();
    			attr_dev(div, "slot", "body");
    			add_location(div, file, 33, 16, 1377);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div, null);
    			}

    			append_dev(div, t);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*classes*/ 1) {
    				each_value_2 = /*point*/ ctx[8].content;
    				validate_each_argument(each_value_2);
    				let i;

    				for (i = 0; i < each_value_2.length; i += 1) {
    					const child_ctx = get_each_context_2(ctx, each_value_2, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_2(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(div, t);
    					}
    				}

    				group_outros();

    				for (i = each_value_2.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_2.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			destroy_each(each_blocks, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_body_slot.name,
    		type: "slot",
    		source: "(34:16) ",
    		ctx
    	});

    	return block;
    }

    // (13:8) {#each points as point}
    function create_each_block_1(ctx) {
    	let accordionitem;
    	let current;

    	accordionitem = new AccordionItem({
    			props: {
    				key: /*point*/ ctx[8].id,
    				class: "wrapper",
    				$$slots: {
    					body: [create_body_slot],
    					header: [create_header_slot]
    				},
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(accordionitem.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(accordionitem, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const accordionitem_changes = {};
    			if (dirty & /*classes*/ 1) accordionitem_changes.key = /*point*/ ctx[8].id;

    			if (dirty & /*$$scope, classes, key*/ 16387) {
    				accordionitem_changes.$$scope = { dirty, ctx };
    			}

    			accordionitem.$set(accordionitem_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(accordionitem.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(accordionitem.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(accordionitem, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(13:8) {#each points as point}",
    		ctx
    	});

    	return block;
    }

    // (12:4) <Accordion bind:key>
    function create_default_slot(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value_1 = /*points*/ ctx[5];
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*classes, key*/ 3) {
    				each_value_1 = /*points*/ ctx[5];
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value_1.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value_1.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(12:4) <Accordion bind:key>",
    		ctx
    	});

    	return block;
    }

    // (54:4) {#if i !== classes.length - 1}
    function create_if_block(ctx) {
    	let starline;
    	let current;
    	starline = new StarLine({ $$inline: true });

    	const block = {
    		c: function create() {
    			create_component(starline.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(starline, target, anchor);
    			current = true;
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(starline.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(starline.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(starline, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(54:4) {#if i !== classes.length - 1}",
    		ctx
    	});

    	return block;
    }

    // (10:0) {#each classes as { title, btn, points }
    function create_each_block(ctx) {
    	let h3;
    	let t0_value = /*title*/ ctx[3] + "";
    	let t0;
    	let t1;
    	let accordion;
    	let updating_key;
    	let t2;
    	let button;
    	let t3;
    	let if_block_anchor;
    	let current;

    	function accordion_key_binding(value) {
    		/*accordion_key_binding*/ ctx[2](value);
    	}

    	let accordion_props = {
    		$$slots: { default: [create_default_slot] },
    		$$scope: { ctx }
    	};

    	if (/*key*/ ctx[1] !== void 0) {
    		accordion_props.key = /*key*/ ctx[1];
    	}

    	accordion = new Accordion({ props: accordion_props, $$inline: true });
    	binding_callbacks.push(() => bind(accordion, 'key', accordion_key_binding));

    	button = new Button({
    			props: {
    				onClick: /*btn*/ ctx[4].href,
    				target: "_blank",
    				text: /*btn*/ ctx[4].text,
    				withEnterIcon: true,
    				fullWidth: true,
    				style: "margin-bottom: 15px; margin-top: -5px"
    			},
    			$$inline: true
    		});

    	let if_block = /*i*/ ctx[7] !== /*classes*/ ctx[0].length - 1 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			h3 = element("h3");
    			t0 = text(t0_value);
    			t1 = space();
    			create_component(accordion.$$.fragment);
    			t2 = space();
    			create_component(button.$$.fragment);
    			t3 = space();
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    			attr_dev(h3, "class", "svelte-10qg8tf");
    			add_location(h3, file, 10, 4, 399);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, h3, anchor);
    			append_dev(h3, t0);
    			insert_dev(target, t1, anchor);
    			mount_component(accordion, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(button, target, anchor);
    			insert_dev(target, t3, anchor);
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*classes*/ 1) && t0_value !== (t0_value = /*title*/ ctx[3] + "")) set_data_dev(t0, t0_value);
    			const accordion_changes = {};

    			if (dirty & /*$$scope, classes, key*/ 16387) {
    				accordion_changes.$$scope = { dirty, ctx };
    			}

    			if (!updating_key && dirty & /*key*/ 2) {
    				updating_key = true;
    				accordion_changes.key = /*key*/ ctx[1];
    				add_flush_callback(() => updating_key = false);
    			}

    			accordion.$set(accordion_changes);
    			const button_changes = {};
    			if (dirty & /*classes*/ 1) button_changes.onClick = /*btn*/ ctx[4].href;
    			if (dirty & /*classes*/ 1) button_changes.text = /*btn*/ ctx[4].text;
    			button.$set(button_changes);

    			if (/*i*/ ctx[7] !== /*classes*/ ctx[0].length - 1) {
    				if (if_block) {
    					if (dirty & /*classes*/ 1) {
    						transition_in(if_block, 1);
    					}
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					transition_in(if_block, 1);
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				group_outros();

    				transition_out(if_block, 1, 1, () => {
    					if_block = null;
    				});

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(accordion.$$.fragment, local);
    			transition_in(button.$$.fragment, local);
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(accordion.$$.fragment, local);
    			transition_out(button.$$.fragment, local);
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(h3);
    			if (detaching) detach_dev(t1);
    			destroy_component(accordion, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(button, detaching);
    			if (detaching) detach_dev(t3);
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(10:0) {#each classes as { title, btn, points }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let each_1_anchor;
    	let current;
    	let each_value = /*classes*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	const out = i => transition_out(each_blocks[i], 1, 1, () => {
    		each_blocks[i] = null;
    	});

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			each_1_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(target, anchor);
    			}

    			insert_dev(target, each_1_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*classes, key*/ 3) {
    				each_value = /*classes*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    						transition_in(each_blocks[i], 1);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						transition_in(each_blocks[i], 1);
    						each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
    					}
    				}

    				group_outros();

    				for (i = each_value.length; i < each_blocks.length; i += 1) {
    					out(i);
    				}

    				check_outros();
    			}
    		},
    		i: function intro(local) {
    			if (current) return;

    			for (let i = 0; i < each_value.length; i += 1) {
    				transition_in(each_blocks[i]);
    			}

    			current = true;
    		},
    		o: function outro(local) {
    			each_blocks = each_blocks.filter(Boolean);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				transition_out(each_blocks[i]);
    			}

    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			if (detaching) detach_dev(each_1_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('TypesOfClasses', slots, []);
    	let { classes } = $$props;
    	let key;

    	$$self.$$.on_mount.push(function () {
    		if (classes === undefined && !('classes' in $$props || $$self.$$.bound[$$self.$$.props['classes']])) {
    			console.warn("<TypesOfClasses> was created without expected prop 'classes'");
    		}
    	});

    	const writable_props = ['classes'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<TypesOfClasses> was created with unknown prop '${key}'`);
    	});

    	function accordion_key_binding(value) {
    		key = value;
    		$$invalidate(1, key);
    	}

    	$$self.$$set = $$props => {
    		if ('classes' in $$props) $$invalidate(0, classes = $$props.classes);
    	};

    	$$self.$capture_state = () => ({
    		Accordion,
    		AccordionItem,
    		Icon,
    		Button,
    		UnorderedList,
    		StarLine,
    		classes,
    		key
    	});

    	$$self.$inject_state = $$props => {
    		if ('classes' in $$props) $$invalidate(0, classes = $$props.classes);
    		if ('key' in $$props) $$invalidate(1, key = $$props.key);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [classes, key, accordion_key_binding];
    }

    class TypesOfClasses extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { classes: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TypesOfClasses",
    			options,
    			id: create_fragment$1.name
    		});
    	}

    	get classes() {
    		throw new Error("<TypesOfClasses>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set classes(value) {
    		throw new Error("<TypesOfClasses>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.55.1 */

    function create_fragment(ctx) {
    	let about;
    	let t;
    	let typesofclasses;
    	let current;
    	const about_spread_levels = [data.about];
    	let about_props = {};

    	for (let i = 0; i < about_spread_levels.length; i += 1) {
    		about_props = assign(about_props, about_spread_levels[i]);
    	}

    	about = new About({ props: about_props, $$inline: true });

    	typesofclasses = new TypesOfClasses({
    			props: { classes: data.classes },
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(about.$$.fragment);
    			t = space();
    			create_component(typesofclasses.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(about, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(typesofclasses, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const about_changes = (dirty & /*data*/ 0)
    			? get_spread_update(about_spread_levels, [get_spread_object(data.about)])
    			: {};

    			about.$set(about_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(about.$$.fragment, local);
    			transition_in(typesofclasses.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(about.$$.fragment, local);
    			transition_out(typesofclasses.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(about, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(typesofclasses, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ data, About, TypesOfClasses });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App(Object.assign({ target: document.body }, data));

    return app;

})();
//# sourceMappingURL=bundle.js.map
