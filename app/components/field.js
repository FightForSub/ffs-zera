import React, { Fragment } from 'react';
import { useEntityField } from '@/providers/entity';

export default function Field({ entity, field, value, isEdit, hasLabel }) {
    const { InputComponent, DisplayComponent, LabelComponent, required } = useEntityField(entity, field);
    const FieldComp = isEdit ? InputComponent : DisplayComponent;
    const Label = hasLabel ? LabelComponent : () => null;
    return (
        <Fragment>
            <Label>{`${entity}.${field}${required ? '*' : ''}`}</Label>
            <FieldComp value={value} />
        </Fragment >
    );
}